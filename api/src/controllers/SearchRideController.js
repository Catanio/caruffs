const Ride = require('../models/Ride')

module.exports = {

    //Searchs in a defined radius people giving a ride to the university
    async index(req, res) {
        const { latitude, longitude, radius} = req.query

        // for more info, see mongo.operators
        const rides = await Ride.find({
            offering :  {
                $eq: true
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: radius,
                },
            },
        })

        return res.json({ rides })
    }
}