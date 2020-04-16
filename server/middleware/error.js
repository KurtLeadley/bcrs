/**
 * Title: middleware/error.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for development
  console.log(err.stack.red);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found!';
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = 'Duplicate field value entered!';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validations errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal Server Error!',
  });
};

module.exports = errorHandler;
