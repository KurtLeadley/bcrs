/**
 * Title: middleware/auth.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Authentication for routes
exports.authenticate = asyncHandler(async (req, res, next) => {
  try {
    // split the incoming token
    const token = await req.headers.authorization.split(' ')[1];
    // decode the token with jwt secret
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    // store decrypted data
    req.userData = { userId: decodedToken.userId, username: decodedToken.username, role: decodedToken.role };
    next();
  } catch (error) {
    return next(new ErrorResponse('Authenticatiion Unsuccessful!', 401));
  }
});

// Authorization for routes
exports.authorize = asyncHandler(async (req, res, next) => {
  try {
    // Split the authorization header to seperate the token
    const token = await req.headers.authorization.split(' ')[1];
    // decrypt token with jwt secret
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    // store decrypted data
    req.userData = { userId: decodedToken.userId, username: decodedToken.username, role: decodedToken.role };
    // check users role
    if (req.userData.role.toLowerCase() !== 'admin') {
      return next(new ErrorResponse('Unauthorized!', 401));
    }
    next();
  } catch (error) {
    return next(new ErrorResponse('Authentication Unsuccuessful!', 401));
  }
});
