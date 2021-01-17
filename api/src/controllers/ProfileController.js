const Profile = require('../models/Profile');

module.exports = {
    async store(req, res) {
        // '{  }' deconstructs data from req.body and puts inside the new consts
        const { idUffs, password, name, bio, phone, mail} = req.body

        const profile = await Profile.create({
            idUffs,
            password,
            name,
            bio,
            phone,
            mail,
        });

        return res.json( {
            'create' : profile,
        });
    }
}