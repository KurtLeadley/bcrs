/**
 * Title: controllers/role.js
 * Authors: Group4
 * Description: bcrs-api
 */
const Role = require('../models/Role');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc        Get All Roles
 * @route       GET /api/v1/roles
 * @access      Private/admin
 */
exports.getRoles = (req, res, next) => {
  Role.find()
    .then((roles) => {
      if (!roles) {
        return next(new ErrorResponse('Roles not found', 404));
      }
      res.status(200).json({
        success: true,
        roles,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Get Role By Id
 * @route       GET /api/v1/roles/:id
 * @access      Private/admin
 */
exports.getRole = (req, res, next) => {
  Role.findById(req.params.id)
    .then((role) => {
      if (!role) {
        return next(new ErrorResponse('Role not found', 404));
      }
      res.status(200).json({
        success: true,
        role,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Create new Role
 * @route       POST /api/v1/roles
 * @access      Private/admin
 */
exports.createRole = (req, res, next) => {
  const role = new Role({
    text: req.body.text,
  });
  role
    .save()
    .then((role) => {
      res.status(201).json({
        success: true,
        role,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Update Role
 * @route       PUT /api/v1/roles/:id
 * @access      Private/admin
 */
exports.updateRole = (req, res, next) => {
  Role.updateOne(
    { _id: req.params.id },
    {
      $set: {
        // field to update
        text: req.body.text,
      },
    }
  )
    .then((role) => {
      if (role.nModified > 0) {
        res.status(200).json({
          success: true,
          role,
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
 * @desc        Delete role
 * @route       DELETE /api/v1/roles/:id
 * @access      Private/admin
 */
exports.deleteRole = (req, res, next) => {
  Role.deleteOne({ _id: req.params.id })
    .then((role) => {
      if (role.n > 0) {
        res.status(200).json({
          success: true,
          role: {},
        });
      } else {
        return next(new ErrorResponse('Not Authorized', 401));
      }
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error`, 500));
    });
};
