const mongoose = require('mongoose');
const { schemas } = require('caruffs_shared')

const MatchSchema = new mongoose.Schema({
  ride: schemas.RideSchema,
  users: [schemas.ProfileSchema],
  finalized: Boolean
},
{
  timestamps: true
});

module.exports = mongoose.model('Match', MatchSchema)