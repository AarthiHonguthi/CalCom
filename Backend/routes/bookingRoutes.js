const express = require('express');
const router = express.Router();
const { getAvailableSlots, createBooking, getBookings, cancelBooking } = require('../controllers/bookingController');

router.get('/slots', getAvailableSlots);
router.post('/', createBooking);
router.get('/dashboard', getBookings);
router.delete('/:id', cancelBooking);

module.exports = router;