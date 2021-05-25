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
    const { lat, lng, week_info } = req.body;

    const location = {
      type: 'Point',
      coordinates: [lng, lat] //mongoDB geolocation tool specifies first longitude and then latitude
    }

    const ride = await Ride.create({
      owner: req.body.user,
      location,
      week_info,
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
  },

  async destroyRide(req, res) {
    const { id } = req.query

    try  {
      await Ride.deleteOne({ _id: id })
      
      return res.json({ success: true })
    } catch (e) {
      return res.status(404).json({ success: false })
    }
  }
}