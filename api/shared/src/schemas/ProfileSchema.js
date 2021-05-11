const mongoose = require('mongoose');
const VehicleSchema = require('./VehicleSchema')
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
    required: true
  },
  vehicle: VehicleSchema
});

module.exports = ProfileSchema;
