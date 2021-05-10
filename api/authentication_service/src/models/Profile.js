const mongoose = require('mongoose');
const { schemas } = require('caruffs_shared')

const Schema = schemas.ProfileSchema;

Schema.mail = {
  type: String,
  unique: true
}

module.exports = mongoose.model('Profile', Schema);
