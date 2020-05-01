/**
 * Title: controllers/payment.js
 * Author: Nathaniel Liebhart
 * Description: Stripe api controller methods
 */
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc        Create new payment
 * @route       POST /api/v1/payment
 * @access      Private
 */
exports.createPayment = (req, res, next) => {
  // Stripe token from client
  const stripeToken = req.body.stripeToken;
  // Invoice amount sent from the client
  const chargeAmount = Math.round(req.body.amount * 100);
  // Create a new stripe customer
  stripe.customers
    .create()
    .then((customer) => {
      // create a stripe customer account
      return stripe.customers.createSource(customer.id, {
        source: stripeToken.id,
      });
    })
    .then((source) => {
      // Create a charge object
      return stripe.charges.create({
        amount: chargeAmount,
        currency: 'usd',
        customer: source.customer,
      });
    })
    .then((charge) => {
      // return a success message
      res.json({
        success: true,
        message: 'Your invoice has been paid in full. Thank you!',
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`An error occurred: ${err.message}. Charge not completed!`));
    });
};
