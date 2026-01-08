const express = require("express");
const pool = require("../config/db");
const router = express.Router();

const ADMIN_ID = 1;

// Dashboard fetch
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM event_types WHERE user_id=$1 ORDER BY id DESC",
      [ADMIN_ID]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Booking page slug fetch
router.get("/:slug", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM event_types WHERE slug=$1 LIMIT 1",
      [req.params.slug]
    );

    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
