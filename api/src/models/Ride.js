const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');
const Profile = require('./Profile')

const RideSchema = new mongoose.Schema({
  owner: Profile,
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
  week_info: [WeekInfoSchema],
  available_seats: Number
});

module.exports = mongoose.model('Ride', RideSchema);