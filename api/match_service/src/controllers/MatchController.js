const Match = require('../models/Match')
const { utils } = require('caruffs_shared');

module.exports = {
  async join(req, res) {
    const { ride } = req.body

    let match = await Match.findOne({"ride._id": ride._id, finalized: false })
    if (!match) {
      
      match = await Match.create({
        ride,
        users: [req.body.user],
        finalized: false
      })
    } else {
      const match_obj = match.lean()
      const fully = match_obj.ride.available_seats === (match_obj.users.length + 1)
      match = await match.update({
        '$push': {
          users: req.body.user
        },
        '$set': {
          finalized: fully
        }
      }).lean()
    }

    return res.json({ match: match })
  },

  async index(req, res) {
    const { id } = req.query
    const matches = await Match.find({$or: [{ "ride.owner._id": id }, {"users": {"$elemMatch": { "_id": id }}}]})

    return res.json(matches)
  },

  async updateUser(msg) {
    if (msg.action === 'delete') {
      if (msg.is_owner) {
        await Match.updateMany({ 'ride.owner._id': msg._id }, {
          '$set': {
            'ride.owner': utils.redactedProfile()
          }
        })
      } else {
        await Match.updateMany({"users._id": id }, {
          '$set': {
            'users.$': utils.redactedProfile()
          }
        })
      }
    }
  }
}