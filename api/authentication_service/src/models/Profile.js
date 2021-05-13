const { schemas } = require('caruffs_shared');
const mongoose = require('mongoose');
const SHA256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const ProfileSchema = new mongoose.Schema({
  idUffs: {
    type: String,
    required: true
  },
  name: String,
  bio: String,
  phone: String,
  mail: {
    type: String,
    validate: (v) => emailRegexp.test(v),
    required: true,
    unique: true
  },
  password: {
    type: String,
    set: v => Base64.stringify(SHA256(v)),
    required: true
  },
  confirmed_email: {
    type: Boolean,
    default: false
  },
  vehicle: schemas.VehicleSchema
});

ProfileSchema.methods.comparePassword = function(password) {
  return this.password === Base64.stringify(SHA256(password))
}

module.exports = mongoose.model('Profile', ProfileSchema);
