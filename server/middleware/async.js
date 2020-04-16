/**
 * Title: middleware/async.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
