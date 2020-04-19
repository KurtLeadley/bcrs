/**
 * Title: models/Invoice.js
 * Authors: Group 4
 * Description: bcrs-api
 */
const mongoose = require('mongoose');
const LineItemSchema = require('./LineItem');

const InvoiceSchema = mongoose.Schema({
  lineItems: [LineItemSchema],
  partsAmount: {
    type: String,
  },
  laborAmount: {
    type: String,
  },
  lineItemTotal: {
    type: String,
  },
  total: {
    type: Number,
  },
  username: {
    type: String,
  },
  orderDate: {
    type: Date,
  },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
