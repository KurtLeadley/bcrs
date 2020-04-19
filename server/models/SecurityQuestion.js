/**
 * Title: models/SecurityQuestions.js
 * Author: Loren Wetzel
 * Description: bcrs-api
 */
const mongoose = require('mongoose');
const mongooseDisabled = require('mongoose-disable');

const SecurityQuestionSchema = new mongoose.Schema({
  text: { type: String },
  disabled: { type: Boolean, default: false },
});

// plugin used to toggle disabled field
SecurityQuestionSchema.plugin(mongooseDisabled, {
  validateBeforeDisable: false,
});

module.exports = mongoose.model('SecurityQuestion', SecurityQuestionSchema);
