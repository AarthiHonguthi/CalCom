const pool = require("../config/db");

exports.getAvailableSlots = async (req, res) => {
  try {
    const { date, slug } = req.query;

    const event = (
      await pool.query("SELECT * FROM event_types WHERE slug=$1 LIMIT 1", [
        slug,
      ])
    ).rows[0];

    if (!event) return res.json([]);

    const duration = event.duration;

    const avail = (
      await pool.query("SELECT schedule FROM availability WHERE user_id=$1", [
        1,
      ])
    ).rows[0];

    if (!avail) return res.json([]);

    const schedule = avail.schedule;
    const day = new Date(date).getDay();
    const windows = schedule[day];

    if (!windows) return res.json([]);

    let slots = [];

    windows.forEach(({ start, end }) => {
      let s = new Date(`${date}T${start}`);
      let e = new Date(`${date}T${end}`);

      while (s < e) {
        slots.push(new Date(s));
        s = new Date(s.getTime() + duration * 60000);
      }
    });

    const booked = (
      await pool.query(
        "SELECT start_time FROM bookings WHERE event_type_id=$1 AND DATE(start_time)=DATE($2)",
        [event.id, date]
      )
    ).rows.map((b) => new Date(b.start_time).toString());

    slots = slots.filter((s) => !booked.includes(s.toString()));

    res.json(slots);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { event_type_id, booker_name, booker_email, start_time, end_time } =
      req.body;

    const result = await pool.query(
      `INSERT INTO bookings (event_type_id, booker_name, booker_email, start_time, end_time)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [event_type_id, booker_name, booker_email, start_time, end_time]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getDashboardBookings = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, e.title AS event_title
      FROM bookings b
      JOIN event_types e ON b.event_type_id=e.id
      ORDER BY b.start_time DESC
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    await pool.query(`UPDATE bookings SET status='cancelled' WHERE id=$1`, [
      req.params.id,
    ]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
