const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  seats: Number,
  color: String,
  brand: String,
  model: String
})

module.exports = VehicleSchema
