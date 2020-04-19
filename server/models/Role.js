/**
 * Title: models/Role.js
 * Authors: Group 4
 * Description: bcrs-api
 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const RoleSchema = mongoose.Schema({
  text: {
    type: String,
    unique: true,
    dropDups: true,
  },
});

// plugin used to validate unique values
RoleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Role', RoleSchema);
