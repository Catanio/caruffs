const Profile = require('../models/Profile')

module.exports = {
    async store(req, res) {
        // {  } deconstructs os dados de req.body and puts inside the new const
        const { idUffs, name, bio, contact} = req.body

        console.log(req.body)

        const profile = await Profile.create({
            idUffs,
            name,
            bio,
            contact,
        })

        return res.json( {
            'create' : profile,
        })
    }
}