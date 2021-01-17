const Ride = require('../models/Ride')

module.exports = {
    async index(req, res) {

        const rides = await Ride.find();
        const profile = await Profile.findOne();

        return res.json(rides);
    },

    async store(req, res) {
        const { ownerId, mon, tue, wed, thu, fri, sat, latitude, longitude } = req.body;

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude] //mongoDB geolocation tool specifies first longitude and then latitude
        };

        const weekInfo = {
            mon,
            tue,
            wed,
            thu,
            fri,
            sat,
        };

        const ride = await Ride.create({
            ownerId,
            weekInfo,
            location,
        });

        return res.json( {
            'create' : ride,
        });
    }
}