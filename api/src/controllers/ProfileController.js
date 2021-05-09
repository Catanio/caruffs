const Profile = require('../models/Profile');
const SHA256 = require("crypto-js/sha256");
const { get } = require('../models/utils/PointSchema');
const { update } = require('../models/Profile');

module.exports = {
  async store(req, res) {
    // '{  }' deconstructs data from req.body and puts inside the new consts
    const { idUffs, password, name, bio, phone, mail } = req.body

    const profile = await Profile.create({
      idUffs,
      password: SHA256(password),
      name,
      bio,
      phone,
      mail,
    });

    return res.json( {
      profile,
    });
  },

  async login(req, res) {
    const { password, mail } = req.body
    const profile = await Profile.find({ mail })

    if (!profile) {
      res.status(404);
      return res.send('Profile not found')
    }
    if (profile.password === SHA256(password)) {
      delete profile.password
      const token = jwt.sign(profile, process.env.SECRET, {
        expiresIn: 10000
      });
      return res.json({ auth: true, token: token });
    } else {
      res.status(401);
      return res.send('Wrong password')
    }
  },

  async get(req, res) {
    const { id } = req.query
    let profile = await Profile.find({ _id: id })
    if (!profile) {
      res.status(404);
      return res.send('Profile not found')
    }
    delete profile.password
    return res.json(profile)
  },

  async update(req, res) {
    const { id } = req.query
    const body = req.body

    delete body.password
    delete body.idUffs

    const profile = await Profile.updateOne({ _id : id }, {
      '$set': body
    })

    return res.json({ profile });
  }
}