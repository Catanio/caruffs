const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  idUffs: String,
  name: String,
  bio: String,
  phone: String,
  mail: {
    type: String,
    unique: true // `email` must be unique
  },
  password: String,
  confirmed_email: Boolean
});

module.exports = mongoose.model('Profile', ProfileSchema);
