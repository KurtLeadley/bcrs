/**
 * Title: models/LineItem.js
 * Author: Group 4
 * Description: bcrs-api
 */
const mongoose = require('mongoose');

const LineItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = LineItemSchema;
