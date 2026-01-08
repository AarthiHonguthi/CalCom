const pool = require('../config/db');
const ADMIN_ID = 1;

const getEventTypes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM event_types WHERE user_id = $1 ORDER BY id DESC', [ADMIN_ID]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const createEventType = async (req, res) => {
    const { title, slug, description, duration } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO event_types (user_id, title, slug, description, duration) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [ADMIN_ID, title, slug, description, duration]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getPublicEvent = async (req, res) => {
    const { slug } = req.params;
    try {
        const result = await pool.query('SELECT * FROM event_types WHERE slug = $1', [slug]);
        if (result.rows.length === 0) return res.status(404).json({ msg: "Event type not found" });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getEventTypes, createEventType, getPublicEvent };    