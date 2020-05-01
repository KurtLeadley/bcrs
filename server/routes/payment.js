/**
 * Title: routes/payment.js
 * Author: Nathaniel Liebhart
 * Description: Stripe api payment routes
 */
const router = require('express').Router();
const { createPayment } = require('../controllers/payment.js');

router.post('/', createPayment);

module.exports = router;
