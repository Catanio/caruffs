const Ride = require('../models/Ride')
const Match = require('../models/Match')
module.exports = {
  async index(req, res) {
    const { latitude, longitude, radius } = req.query

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
    }).lean()

    return res.json(rides)
  },

  async store(req, res) {
    const { lat, lng, week_info } = req.body;

    const location = {
      type: 'Point',
      coordinates: [lng, lat] //mongoDB geolocation tool specifies first longitude and then latitude
    }

    const ride = await Ride.create({
      ownerId: req.user,
      location,
      week_info,
      available_seats: req.user.vehicle.available_seats
    }).lean()

    return res.json({ ride })
  }
}