/**
 * Title: models/UserSecurityAnswer.js
 * Authors: Group 4,
 * Description: bcrs-api
 */
const mongoose = require('mongoose');

const UserSecurityAnswerSchema = mongoose.Schema(
  {
    questionId: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: 'dateCreated', updatedAt: 'dateModified' } }
);

module.exports = UserSecurityAnswerSchema;
