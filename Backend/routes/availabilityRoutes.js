const express = require("express");
const pool = require("../config/db");
const router = express.Router();

const ADMIN_ID = 1;

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT schedule FROM availability WHERE user_id=$1",
      [ADMIN_ID]
    );

    if (result.rows.length === 0) return res.json({});
    res.json(result.rows[0].schedule);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.put("/", async (req, res) => {
  try {
    const schedule = req.body.schedule;

    await pool.query(
      `INSERT INTO availability (user_id, schedule)
       VALUES ($1, $2)
       ON CONFLICT (user_id)
       DO UPDATE SET schedule=$2`,
      [ADMIN_ID, schedule]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
