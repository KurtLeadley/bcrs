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
  paidInvoice,
} = require('../controllers/invoice');

const router = express.Router();

// Invoice routes
// POST
router.post('/', createInvoice);
router.get('/users/:username', getInvoicesByUser);
// GET
router.get('/purchases/:serviceId', getPurchasesByServiceCount);
router.get('/purchases', getPurchasesByService);
router.get('/:id', getInvoice);
router.get('/', getInvoices);
// PUT

// DELETE
router.delete('/paid/:id', paidInvoice);
module.exports = router;
