const pool = require("../config/db");
const ADMIN_ID = 1;

// 1. Get all events
const getEventTypes = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM event_types WHERE user_id = $1 ORDER BY id DESC",
      [ADMIN_ID]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// 2. Create new event
const createEventType = async (req, res) => {
  const { title, slug, description, duration } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO event_types (user_id, title, slug, description, duration) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [ADMIN_ID, title, slug, description, duration]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// 3. Get public event by slug
const getPublicEvent = async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM event_types WHERE slug = $1",
      [slug]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ msg: "Event type not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// 4. UPDATE Event Type (New)
const updateEventType = async (req, res) => {
  const { id } = req.params;
  const { title, slug, description, duration } = req.body;

  try {
    const result = await pool.query(
      `UPDATE event_types 
             SET title = $1, slug = $2, description = $3, duration = $4 
             WHERE id = $5 AND user_id = $6 
             RETURNING *`,
      [title, slug, description, duration, id, ADMIN_ID]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// 5. DELETE Event Type (New)
const deleteEventType = async (req, res) => {
  const { id } = req.params;

  try {
    // First, delete bookings associated with this event to prevent database errors
    await pool.query("DELETE FROM bookings WHERE event_type_id = $1", [id]);

    // Now delete the event type itself
    const result = await pool.query(
      "DELETE FROM event_types WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, ADMIN_ID]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.json({ msg: "Event deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getEventTypes,
  createEventType,
  getPublicEvent,
  updateEventType,
  deleteEventType,
};

// Get public (non-hidden) event types
const getPublicEventTypes = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM event_types WHERE user_id=$1 AND (hidden IS NULL OR hidden = false) ORDER BY id DESC",
      [ADMIN_ID]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update visibility (hidden flag) for an event type
const updateVisibility = async (req, res) => {
  const { id } = req.params;
  const { hidden } = req.body;
  try {
    const result = await pool.query(
      `UPDATE event_types SET hidden = $1 WHERE id = $2 AND user_id = $3 RETURNING *`,
      [hidden, id, ADMIN_ID]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ msg: "Event not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports.getPublicEventTypes = getPublicEventTypes;
module.exports.updateVisibility = updateVisibility;
