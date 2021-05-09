const { Ride } = require('../models/Ride')
const { Match } = require('../models/Match')

module.exports = {
  async join(req, res) {
    const { ride_id } = req.body

    let match = await Match.findOne({ ride: { _id: ride_id, finalized: false }})
    if (!match) {
      const ride = await Ride.findOne({ _id: ride_id }).lean()
      
      match = await Match.create({
        ride,
        users: [req.user],
        finalized: false
      })
    } else {
      const match_obj = match.lean()
      const fully = match_obj.ride.available_seats === (match_obj.users.length + 1)
      match = await match.update({
        '$push': {
          users: req.user
        },
        '$set': {
          finalized: fully
        }
      }).lean()
    }

    return res.json({ match: match })
  },

  async index(req, res) {
    let matches
    if (req.user.vehicle) {
      matches = await Match.find({"ride.owner._id": req.user._id })
    } else {
      matches = await Match.find({"users": {"$elemMatch": { "_id": req.user._id }}})
      console.log(matches)
    }

    return res.json(matches)
  }
}