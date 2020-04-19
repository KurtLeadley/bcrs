/**
 * Title: utils/errorResponse.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */

// This class is used to refine the error response
// returned by the errorHandler middleware
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
