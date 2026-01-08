const express = require("express");
const {
  getAvailableSlots,
  createBooking,
  getDashboardBookings,
  cancelBooking,
} = require("../controllers/bookingController");
const router = express.Router();

router.get("/slots", getAvailableSlots);
router.post("/", createBooking);
router.get("/dashboard", getDashboardBookings);
router.delete("/:id", cancelBooking);

module.exports = router;
