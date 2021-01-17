const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const RideSchema = new mongoose.Schema({

    ownerId: String,
    // geolocation
    offering: Boolean,
    location: {
        type: PointSchema,
        index: '2dsphere',
    },
    weekInfo: {
        mon: {
            vacancies: Number,
            Depart: String,
            arrival: String
        },
        tue: {
            vacancies: Number,
            Depart: String,
            arrival: String
        },
        wed: {
            vacancies: Number,
            Depart: String,
            arrival: String
        },
        thu: {
            vacancies: Number,
            Depart: String,
            arrival: String
        },
        fri: {
            vacancies: Number,
            Depart: String,
            arrival: String
        },
        sat: {
            vacancies: Number,
            Depart: String,
            arrival: String
        },
    }
});

module.exports = mongoose.model('Ride', RideSchema);