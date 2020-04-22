/**
 * Title: controllers/invoice.js
 * Authors: Group 4
 * Description: bcrs-api
 */
const ErrorResponse = require('../utils/errorResponse');
const Invoice = require('../models/Invoice');
const Service = require('../models/Service');

/**
 * @desc        Get All Invoices
 * @route       GET /api/v1/invoices
 * @access      Private
 */
exports.getInvoices = (req, res, next) => {
  Invoice.find()
    .then((invoices) => {
      if (!invoices) {
        return next(new ErrorResponse('Invoices not found', 404));
      }
      res.status(200).json({
        success: true,
        invoices,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Get Invoice By ID
 * @route       GET /api/v1/invoices/:id
 * @access      Private
 */
exports.getInvoice = (req, res, next) => {
  Invoice.findById(req.params.id)
    .then((invoice) => {
      if (!invoice) {
        return next(new ErrorResponse('Invoice not found', 404));
      }
      res.status(200).json({
        success: true,
        invoice,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Get Invoices By Username
 * @route       POST /api/v1/invoices/:username
 * @access      Private
 */
exports.getInvoicesByUser = (req, res, next) => {
  Invoice.find()
    .where('username')
    .equals(req.params.username)
    .then((invoice) => {
      if (!invoice) {
        return next(new ErrorResponse('Invoices not found', 404));
      }
      res.status(200).json({
        success: true,
        invoiceList: invoice,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`));
    });
};

/**
 * @desc        Get All Invoices By Service
 * @route       GET /api/v1/invoices/purchases
 * @access      Private
 */
exports.getPurchasesByService = (req, res, next) => {
  Invoice.aggregate([
    { $match: {} },
    { $unwind: '$lineItems' },
    { $project: { _id: 0, lineItem: ['$lineItems._id', '$lineItems.title'] } },
    {
      $group: {
        _id: { lineItems: '$lineItem' },
        count: { $sum: 1 },
      },
    },
  ])
    .then((resp) => {
      let array = [];
      let i = 0;

      resp.forEach((element) => {
        array.push({
          _id: element._id.lineItems[0],
          title: element._id.lineItems[1],
          count: element.count,
        });
      });

      res.status(200).json({
        success: true,
        graph: array,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Get All Invoices By Service ID
 * @route       GET /api/v1/invoices/purchases/:serviceId
 * @access      Private
 */
exports.getPurchasesByServiceCount = (req, res, next) => {
  Invoice.find({
    'lineItems._id': {
      $in: req.params.serviceId,
    },
  })
    .count()
    // qty = quantity
    .then((qty) => {
      if (!qty) {
        res.status(200).json({
          success: true,
          quantity: 0,
        });
      }
      res.status(200).json({
        success: true,
        quantity: qty,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Create New Invoice
 * @route       POST /api/v1/invoices
 * @access      Private
 */
exports.createInvoice = (req, res, next) => {
  // create temp invoice variable
  const invoice = new Invoice({
    lineItems: req.body.lineItems,
    partsAmount: req.body.partsAmount,
    laborAmount: req.body.laborAmount,
    lineItemTotal: req.body.lineItemTotal,
    total: req.body.total,
    username: req.body.username,
  });
  // save invoice to database
  invoice
    .save()
    .then((invoice) => {
      res.status(201).json({
        success: true,
        invoice,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};
