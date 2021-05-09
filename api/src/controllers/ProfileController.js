const Profile = require('../models/Profile');
const SHA256 = require("crypto-js/sha256");
const Base64 = require('crypto-js/enc-base64')
const jwt = require('jsonwebtoken')
const mailer = require('../libs/mailer')
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

module.exports = {
  async store(req, res) {
    const body = req.body

    if (!emailRegexp.test(body.mail)) {
      res.status(401);
      return res.send('Invalid email')
    }
    try {
      body.password = Base64.stringify(SHA256(body.password))

      const profile = await Profile.create(body);
      
      mailer.sendConfirmationEmail(mail)
      
      return res.json({
        profile,
      })
    } catch (e) {
      return res.json({ result: false, details: e })
    }
  },

  async login(req, res) {
    const { password, mail } = req.body
    const profile = await Profile.findOne ({ mail }).lean()

    if (!profile) {
      res.status(404);
      return res.send('Profile not found')
    }

    if (!profile.confirmed_email) {
      res.status(401);
      return res.send('Unverified email')
    }

    if (profile.password === Base64.stringify(SHA256(password))) {
      delete profile.password
      delete profile.__v

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
    const { _id } = req.user
    console.log(req.user)
    let profile = await Profile.find({ _id }).lean()
    if (!profile) {
      res.status(404);
      return res.send('Profile not found')
    }
    delete profile.password
    return res.json(profile)
  },

  async update(req, res) {
    const { _id } = req.user
    const body = req.body

    delete body.password
    delete body.idUffs

    const profile = await Profile.updateOne({ _id }, {
      '$set': body
    }).lean()

    return res.json({ profile });
  },

  async recycleToken(req, res) {
    const { _id } = req.user
    const profile = await Profile.findOne ({ _id }).lean()

    const token = jwt.sign(profile, process.env.SECRET, {
      expiresIn: 10000
    });

    return res.json({ auth: true, token: token });
  },

  async confirmEmail(req, res) {
    const { token } = req.query
    try {
      const decoded = jwt.verify(token, process.env.SECRET)
      await Profile.updateOne({ mail: decoded.mail }, {
        '$set': {
          confirmed_email: true
        }
      })

      return res.send(`Obrigado por confirmar seu email`);
    } catch (e) {
      return res.status(401).send('Desculpe, não conseguimos identificar sua conta');
    }
  }
}
