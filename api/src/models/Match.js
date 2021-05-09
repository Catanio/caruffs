const mongoose = require('mongoose');
const ProfileSchema = require('./Profile');
const Ride = require('./Ride');

const MatchSchema = new mongoose.Schema({
  ride: Ride,
  users: [ProfileSchema],
  finalized: Boolean
},
{
  timestamps: true
});

module.exports = mongoose.model('Match', MatchSchema);