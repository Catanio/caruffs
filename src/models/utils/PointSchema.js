const mongoose = require('mongoose');


// if lost, see in "omnistack creating db - 1h10m
const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
})

module.exports = PointSchema