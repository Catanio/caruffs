const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  idUffs: String,
  name: String,
  bio: String,
  phone: String,
  mail: String,
  password: String
});

module.exports = mongoose.model('Profile', ProfileSchema);
