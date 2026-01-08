const express = require('express');
const router = express.Router();
const { getEventTypes, createEventType, getPublicEvent } = require('../controllers/eventController');

router.get('/', getEventTypes);
router.post('/', createEventType);
router.get('/:slug', getPublicEvent);

module.exports = router;