const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const RideSchema = new mongoose.Schema({
  ownerId: mongoose.Types.ObjectId,
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
  week_info: [WeekInfoSchema],
  available_seats: Number
});

module.exports = mongoose.model('Ride', RideSchema);