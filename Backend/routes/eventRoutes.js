const express = require("express");
const router = express.Router();
const {
  getEventTypes,
  createEventType,
  getPublicEvent,
  updateEventType,
  deleteEventType,
} = require("../controllers/eventController");
const {
  getPublicEventTypes,
  updateVisibility,
} = require("../controllers/eventController");

// Existing Routes
router.get("/", getEventTypes);
router.post("/", createEventType);
router.get("/:slug", getPublicEvent);

// NEW Routes for Edit and Delete
router.put("/:id", updateEventType); // Use PUT to update
router.delete("/:id", deleteEventType); // Use DELETE to remove
// public list
router.get("/public/list", getPublicEventTypes);
// update hidden flag
router.patch("/:id/visibility", updateVisibility);

module.exports = router;
