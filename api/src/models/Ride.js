const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');
const { ProfileSchema } = require('./Profile')
const WeekInfoSchema = require('./utils/WeekInfoSchema')

const RideSchema = new mongoose.Schema({
  owner: ProfileSchema,
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
  week_info: [WeekInfoSchema],
  available_seats: Number
});

module.exports = { Ride: mongoose.model('Ride', RideSchema), RideSchema }