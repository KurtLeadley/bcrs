/**
 * Title: models/Service.js
 * Authors: Group 4
 * Description: bcrs-api
 */
const mongoose = require('mongoose');
const mongooseDisabled = require('mongoose-disable');

const ServiceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

ServiceSchema.plugin(mongooseDisabled, { validateBeforeDisable: false });

module.exports = mongoose.model('Service', ServiceSchema);
