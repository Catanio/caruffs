const mongoose = require('mongoose');
const VehicleSchema = require('./VehicleSchema')

const ProfileSchema = new mongoose.Schema({
  idUffs: String,
  name: String,
  bio: String,
  phone: String,
  mail: String,
  password: String,
  confirmed_email: Boolean,
  vehicle: VehicleSchema
});

module.exports = ProfileSchema;
