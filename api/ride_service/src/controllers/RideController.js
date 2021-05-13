const Ride = require('../models/Ride')
const { utils } = require('caruffs_shared')

module.exports = {
  async index(req, res) {
    const { latitude, longitude, radius } = req.query

    const rides = await Ride.find({
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
    if (!req.body.user.vehicle) {
      res.status(401);
      return res.send('Must have vehicle to create ride')
    }
    const { lat, lng, week_info } = req.body;

    const location = {
      type: 'Point',
      coordinates: [lng, lat] //mongoDB geolocation tool specifies first longitude and then latitude
    }

    const ride = await Ride.create({
      owner: req.body.user,
      location,
      week_info,
      available_seats: req.body.user.vehicle.available_seats
    })

    return res.json({ ride })
  },

  async updateUser(msg) {
    console.log(msg)
    if (msg.action === 'delete') {
      await Ride.updateMany({ 'owner._id': msg._id }, {
        '$set': {
          owner: utils.redactedProfile()
        }
      })
    }
  }
}