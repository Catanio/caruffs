const Ride = require('../models/Ride')

module.exports = {
    async index(req, res) {
        const rides = await Ride.find()

        return res.json(rides)
    },

    async store(req, res) {
        // { } deconstructs os dados de req.body and puts inside the new const
        const { idUffs, offering, weekdays, latitude, longitude } = req.body

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude] //mongoDB geolocation tool specifies first longitude and then latitude
        }

        const ride = await Ride.create({
            idUffs,
            offering,
            weekdays,
            location,
        })

        return res.json( {
            'create' : ride,
        })
    }
}