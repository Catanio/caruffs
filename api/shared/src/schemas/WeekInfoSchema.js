const mongoose = require('mongoose');

const WeekInfoSchema = new mongoose.Schema({
  week_day: {
    type: Number,
    enum : [1, 2, 3, 4, 5, 6, 7],
    default: 1
  },
  going_time: String,
  returning_time: String
})

module.exports = WeekInfoSchema
