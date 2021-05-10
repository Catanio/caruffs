const mongoose = require('mongoose');

const WeekInfoSchema = new mongoose.Schema({
  week_day: String,
  going_time: String,
  returning_time: String
})

module.exports = WeekInfoSchema
