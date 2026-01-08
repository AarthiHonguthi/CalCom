const pool = require('../config/db');

const toMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

const getAvailableSlots = async (req, res) => {
    const { date, slug } = req.query;
    try {
        const eventRes = await pool.query('SELECT * FROM event_types WHERE slug = $1', [slug]);
        if (eventRes.rows.length === 0) return res.status(404).json({ msg: "Event not found" });
        const event = eventRes.rows[0];

        const availRes = await pool.query('SELECT schedule FROM availability WHERE user_id = $1', [event.user_id]);
        const schedule = availRes.rows[0]?.schedule || {};

        const targetDate = new Date(date);
        const dayOfWeek = targetDate.getDay(); 
        const dayConfig = schedule[dayOfWeek];

        if (!dayConfig || dayConfig.length === 0) return res.json([]);

        const bookingsRes = await pool.query(
            `SELECT start_time, end_time FROM bookings WHERE event_type_id = $1 AND status = 'confirmed' AND start_time::date = $2::date`,
            [event.id, date]
        );
        const existingBookings = bookingsRes.rows;

        let availableSlots = [];
        const duration = event.duration;

        for (const window of dayConfig) {
            let currentMin = toMinutes(window.start);
            let endMin = toMinutes(window.end);

            while (currentMin + duration <= endMin) {
                const slotStart = new Date(`${date}T00:00:00`);
                slotStart.setHours(Math.floor(currentMin / 60), currentMin % 60);
                const slotEnd = new Date(slotStart.getTime() + duration * 60000);

                const isTaken = existingBookings.some(b => {
                    const bStart = new Date(b.start_time);
                    const bEnd = new Date(b.end_time);
                    return slotStart < bEnd && slotEnd > bStart;
                });

                if (!isTaken) availableSlots.push(slotStart.toISOString());
                currentMin += duration;
            }
        }
        res.json(availableSlots);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

const createBooking = async (req, res) => {
    const { slug, name, email, startTime } = req.body;
    try {
        const eventRes = await pool.query('SELECT id, duration FROM event_types WHERE slug = $1', [slug]);
        const eventId = eventRes.rows[0].id;
        const duration = eventRes.rows[0].duration;

        const start = new Date(startTime);
        const end = new Date(start.getTime() + duration * 60000);

        const newBooking = await pool.query(
            'INSERT INTO bookings (event_type_id, booker_name, booker_email, start_time, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [eventId, name, email, start, end]
        );
        res.json(newBooking.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getBookings = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT b.*, e.title as event_title FROM bookings b JOIN event_types e ON b.event_type_id = e.id ORDER BY b.start_time ASC`
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const cancelBooking = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("UPDATE bookings SET status = 'cancelled' WHERE id = $1", [id]);
        res.json({ msg: "Booking cancelled" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getAvailableSlots, createBooking, getBookings, cancelBooking };