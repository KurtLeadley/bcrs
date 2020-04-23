/**
 * Title: controllers/users.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

/**
 * @desc        Get all users
 * @route       GET /api/v1/users
 * @access      Private/admin
 */
exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      if (!users) {
        return next(new ErrorResponse('Users not fount', 404));
      }
      res.status(200).json({
        success: true,
        users,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Get single user
 * @route       GET /api/v1/users/:id
 * @access      Private/admin
 */
exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return next(new ErrorResponse('User not found', 404));
      } else {
        res.status(200).json({
          success: true,
          user,
        });
      }
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Create user
 * @route       POST /api/v1/users
 * @access      Private/admin
 */
exports.createUser = (req, res, next) => {
  // hash password before storing in database
  bcrypt
    .hash(req.body.password, 10) //set salt length?
    .then((hash) => {
      //on success
      const user = new User({
        username: req.body.username.toLowerCase(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        email: req.body.email,
        role: req.body.role,
        password: hash,
        securityAnswers: req.body.securityAnswers,
      });
      user //finally save the user
        .save()
        .then((user) => {
          res.status(201).json({
            //return created status code
            success: true,
            user,
          });
        })
        .catch((err) => {
          return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
        }); //save to database
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Update user
 * @route       PUT /api/v1/users/:id
 * @access      Private/admin
 */
exports.updateUser = (req, res, next) => {
  User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        // fields to update
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        email: req.body.email,
        role: req.body.role,
      },
    }
  )
    .then((user) => {
      if (user.nModified > 0) {
        res.status(200).json({
          success: true,
          user,
        });
      } else {
        return next(new ErrorResponse('Not Authorized', 401));
      }
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Delete user
 * @route       DELETE /api/v1/users/:id
 * @access      Private/admin
 */
exports.deleteUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user.disabled === false) {
        user.disable();
      } else {
        user.enable();
      }
      res.status(200).json({
        success: true,
        data: user,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Find Users Role
 * @route       GET /api/v1/users/:username/role
 * @access      Private/admin
 */
exports.getUserRole = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      if (!user) {
        return next(new ErrorResponse('No user found', 404));
      }
      if (!user.role || user.role === '') {
        return next(new ErrorResponse('No user role found', 404));
      }
      res.status(200).json({
        success: true,
        role: user.role,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};
