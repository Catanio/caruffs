const mongoose = require('mongoose');
const ProfileSchema = require('./Profile')

const MatchSchema = new mongoose.Schema({
  ride_id: mongoose.Types.ObjectId,
  users: [ProfileSchema]
},
{
  timestamps: true
});

module.exports = mongoose.model('Match', MatchSchema);