const Profile = require('../models/Profile');
const SHA256 = require("crypto-js/sha256");
const Base64 = require('crypto-js/enc-base64')
const jwt = require('jsonwebtoken')
const amqp = require('../libs/amqp')
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
      body.confirmed_email = false

      const profile = await Profile.create(body)
      
      amqp.send(JSON.stringify({ mail: profile.mail, template: 'new_account' }))
      
      return res.json({
        profile,
      })
    } catch (e) {
      console.log(e)
      return res.json({ result: false, details: e })
    }
  },

  async login(req, res) {
    const { password, mail } = req.body
    const profile = await Profile.findOne({ mail }).lean()

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
    const { id } = req.query

    let profile = await Profile.find({ _id: id }).lean()
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

    const profile = await Profile.updateOne({ _id: id }, {
      '$set': body
    }).lean()

    return res.json({ profile });
  },

  async recycleToken(req, res) {
    const { id } = req.query
    const profile = await Profile.findOne ({ _id: id }).lean()

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
  },

  async requestChangePassword(req, res) {
    const { mail } = req.body
    const profile = await Profile.findOne({ mail }).lean()

    amqp.send(JSON.stringify({ mail: profile.mail, id: profile._id, template: 'forgot_password' }))

    res.json({ success: true })
  },

  async changePassword(req, res) {
    const { token, new_password } = req.body
    const { mail, _id } = jwt.verify(token, process.env.SECRET)
    const profile = await Profile.findOne({ _id }).lean()

    if (profile.mail !== mail) {
      res.status(401)
      return res.send('Invalid token')
    } else {
      await Profile.updateOne({ _id }, {
        '$set': {
          password: Base64.stringify(SHA256(new_password))
        }
      })
    }
    res.json({ success: true })
  }
}
