/**
 * Title: models/Invoice.js
 * Authors: Group 4
 * Description: bcrs-api
 */
const mongoose = require('mongoose');
const mongooseDisabled = require('mongoose-disable');
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: 'orderDate', updatedAt: 'dateModified' } }
);

// Enable mongoose disable plugin
InvoiceSchema.plugin(mongooseDisabled, { validateBeforeDisable: false });

module.exports = mongoose.model('Invoice', InvoiceSchema);
