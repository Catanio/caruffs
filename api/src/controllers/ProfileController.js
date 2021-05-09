const Profile = require('../models/Profile');
const SHA256 = require("crypto-js/sha256");

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
        'create': profile,
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
    }
}