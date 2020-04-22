/**
 * Title: models/Invoice.js
 * Authors: Group 4
 * Description: bcrs-api
 */
const mongoose = require('mongoose');
const LineItemSchema = require('./LineItem');

const InvoiceSchema = mongoose.Schema(
  {
    lineItems: [LineItemSchema],
    partsAmount: {
      type: Number,
    },
    laborAmount: {
      type: Number,
    },
    lineItemTotal: {
      type: Number,
    },
    total: {
      type: Number,
    },
    username: {
      type: String,
    },
  },
  { timestamps: { createdAt: 'orderDate', updatedAt: 'dateModified' } }
);

module.exports = mongoose.model('Invoice', InvoiceSchema);
