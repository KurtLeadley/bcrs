/**
 * Title: routes/invoices.js
 * Authors: Group 4
 * Description: bcrs-api
 */
const express = require('express');
const {
  createInvoice,
  getInvoices,
  getInvoice,
  getInvoicesByUser,
  getPurchasesByService,
  getPurchasesByServiceCount,
} = require('../controllers/invoice');

const router = express.Router();

// Invoice routes
// POST
router.post('/', createInvoice);
router.post('/:username', getInvoicesByUser);
// GET
router.get('/purchases/:serviceId', getPurchasesByServiceCount);
router.get('/purchases', getPurchasesByService);
router.get('/:id', getInvoice);
router.get('/', getInvoices);
// PUT

// DELETE

module.exports = router;
