const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const RideSchema = new mongoose.Schema({

    ownerId: String,
    //offering: Boolean,
    // geolocation
    location: {
        type: PointSchema,
        index: '2dsphere',
    },
    weekInfo: {
        mon: {
            //vacancies: Number,
            going: String,
            backing: String
        },
        tue: {
            //vacancies: Number,
            going: String,
            backing: String
        },
        wed: {
            //vacancies: Number,
            going: String,
            backing: String
        },
        thu: {
            //vacancies: Number,
            going: String,
            backing: String
        },
        fri: {
            //vacancies: Number,
            going: String,
            backing: String
        },
        sat: {
            //vacancies: Number,
            going: String,
            backing: String
        },
    }
});

module.exports = mongoose.model('Ride', RideSchema);