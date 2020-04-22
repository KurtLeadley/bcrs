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
router.get('/', getInvoices);
router.get('/:id', getInvoice);
router.get('/purchases', getPurchasesByService);
router.get('/purchases/:serviceId', getPurchasesByServiceCount);
// PUT

// DELETE

module.exports = router;
