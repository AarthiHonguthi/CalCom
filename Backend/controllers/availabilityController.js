const pool = require('../config/db');
const ADMIN_ID = 1;

const getAvailability = async (req, res) => {
    try {
        const result = await pool.query('SELECT schedule FROM availability WHERE user_id = $1', [ADMIN_ID]);
        res.json(result.rows[0]?.schedule || {});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const updateAvailability = async (req, res) => {
    const { schedule } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO availability (user_id, schedule) VALUES ($1, $2) 
             ON CONFLICT (user_id) DO UPDATE SET schedule = $2 RETURNING *`,
            [ADMIN_ID, schedule]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getAvailability, updateAvailability };