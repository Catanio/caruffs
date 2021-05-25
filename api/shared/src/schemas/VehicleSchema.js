const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  color: String,
  brand: String,
  model: String
})

module.exports = VehicleSchema
