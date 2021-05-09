const Ride = require('../models/Ride')
const Match = require('../models/Match')

module.exports = {
  async join(req, res) {
    const { ride_id } = req.body

    const match = await Match.findOne({ ride: { _id: ride_id, finalized: false }})
    if (match.$isEmpty()) {
      const ride = await Ride.findOne({ _id: ride_id }).lean()
      
      await Match.create({
        ride,
        users: [req.user],
        finalized: false
      })
    } else {
      const match_obj = match.lean()
      const fully = match_obj.ride.available_seats === (match_obj.users.length + 1)
      await match.update({
        '$push': {
          users: req.user
        },
        '$set': {
          finalized: fully
        }
      }).lean()
    }

    return res.json({ match: match.lean() })
  }
}