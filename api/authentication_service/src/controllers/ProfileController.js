const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const { utils } = require('caruffs_shared');

module.exports = {
  async store(req, res) {
    const body = req.body

    try {
      const profile = await Profile.create(body)
      
      utils.amqp.send(JSON.stringify({ mail: profile.mail, template: 'new_account' }), process.env.MAILING_QUEUE)
      
      return res.json({
        profile,
      })
    } catch (e) {
      res.status(401)
      return res.json({ result: false, details: e.message })
    }
  },

  async login(req, res) {
    const { password, mail, idUffs } = req.body
    const profile = await Profile.findOne({ $or: [{ mail }, { idUffs }] })

    if (!profile) {
      res.status(404);
      return res.send('Profile not found')
    }

    if (!profile.confirmed_email) {
      res.status(401);
      return res.send('Unverified email')
    }

    if (profile.comparePassword(password)) {
      delete profile.password
      delete profile.__v

      const token = jwt.sign(profile.toObject(), process.env.SECRET, {
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

    utils.amqp.send(JSON.stringify({ mail: profile.mail, id: profile._id, template: 'forgot_password' }), process.env.MAILING_QUEUE)

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
          password: new_password
        }
      })
    }
    res.json({ success: true })
  },
  
  async destroyProfile(req, res) {
    const { id } = req.query
    const profile = await Profile.findOne({ _id: id }).lean()

    try  {
      await Profile.deleteOne({ _id: profile._id })
      
      utils.amqp.send(JSON.stringify({ _id: profile._id, action: 'delete', is_owner: !!profile.vehicle }), process.env.PROPAGATE_USER_QUEUE)

      return res.json({ success: true })
    } catch (e) {
      return res.status(404).json({ success: false })
    }
  }
}
