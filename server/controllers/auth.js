/**
 * Title: controllers/auth.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

/**
 * @desc        Register user
 * @route       POST /api/v1/auth/register
 * @access      Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { username, firstName, lastName, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    username,
    firstName,
    lastName,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 200, res);
});

/**
 * @desc        Login user in
 * @route       POST /api/v1/auth/login
 * @access      Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // Validate username and password
  if (!username || !password) {
    return next(
      new ErrorResponse("Username & password are required to login!", 400)
    );
  }

  // Check for user
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials!", 401));
  }

  // Check if password matches hashed password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials!", 401));
  }

  sendTokenResponse(user, 200, res);
});

/**
 * @desc        Log user out/clear cookie
 * @route       GET /api/v1/auth/logout
 * @access      Private
 */
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

/**
 * @desc        Get current logged in user
 * @route       GET /api/v1/auth/me
 * @access      Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc        Update user details
 * @route       PUT /api/v1/auth/updatedetails
 * @access      Private
 */
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// Get token from model and
// Create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
