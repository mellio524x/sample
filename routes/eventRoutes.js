// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Event creation endpoint
router.post('/create', async (req, res) => {
  const eventData = req.body;

  try {
    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();

    res.status(201).json({ success: true, event: savedEvent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
