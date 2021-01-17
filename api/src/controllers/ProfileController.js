const Profile = require('../models/Profile');

module.exports = {
    async store(req, res) {
        // '{  }' deconstructs data from req.body and puts inside the new consts
        const { idUffs, name, bio, contact} = req.body

        const profile = await Profile.create({
            idUffs,
            name,
            bio,
            contact,
        });

        return res.json( {
            'create' : profile,
        });
    }
}