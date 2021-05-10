const mongoose = require('mongoose');
const { schemas } = require('caruffs_shared')

module.exports = mongoose.model('Ride', schemas.RideSchema);
