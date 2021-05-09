const Ride = require('../models/Ride')

module.exports = {
  async index(req, res) {
    const rides = await Ride.find();
    return res.json(rides);
  },

  async store(req, res) {
    const { lat, lng, week_info } = req.body;

    const location = {
        type: 'Point',
        coordinates: [lng, lat] //mongoDB geolocation tool specifies first longitude and then latitude
    }

    const ride = await Ride.create({
        ownerId: req.user._id,
        location,
        week_info
    })

    return res.json({ ride })
  }
}