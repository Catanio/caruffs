const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
  },
  idUffs: String,
  name: String,
  bio: String,
  phone: String,
  mail: String,
});

module.exports = mongoose.model('Profile', ProfileSchema);