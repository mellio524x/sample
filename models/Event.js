// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  partyName: { type: String, required: true },
  activityDate: { type: Date },
  // ... (other event properties)
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
