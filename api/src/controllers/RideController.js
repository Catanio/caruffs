const Ride = require('../models/Ride')

module.exports = {
    async index(req, res) {
        const rides = await Ride.find();

        return res.json(rides);
    },

    async store(req, res) {
        console.log(req.body);
        const { ownerId, mon, tue, wed, thu, fri, sat, latitude, longitude } = req.body;

        console.log(latitude);
        console.log(longitude);

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