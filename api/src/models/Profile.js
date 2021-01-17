const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    idUffs: String,

    name: String,
    bio: String,
    contact: String,
});

module.exports = mongoose.model('Profile', ProfileSchema);