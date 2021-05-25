const mongoose = require('mongoose');
const PointSchema = require('./PointSchema');
const ProfileSchema = require('./ProfileSchema')
const WeekInfoSchema = require('./WeekInfoSchema')

const RideSchema = new mongoose.Schema({
  owner: ProfileSchema,
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
  week_info: [WeekInfoSchema],
  offering: Boolean
});

module.exports = RideSchema