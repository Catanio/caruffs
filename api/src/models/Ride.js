const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const RideSchema = new mongoose.Schema({
    ownerId: String,
    location: {
        type: PointSchema,
        index: '2dsphere',
    },
    week_info: [WeekInfoSchema]
});

module.exports = mongoose.model('Ride', RideSchema);