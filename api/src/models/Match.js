const mongoose = require('mongoose');
const { ProfileSchema } = require('./Profile');
const { RideSchema } = require('./Ride');

const MatchSchema = new mongoose.Schema({
  ride: RideSchema,
  users: [ProfileSchema],
  finalized: Boolean
},
{
  timestamps: true
});

module.exports = { Match: mongoose.model('Match', MatchSchema) }