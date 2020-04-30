/**
 * Title: controllers/service.js
 * Authors: Group 4
 * Description: bcrs-api
 */
const Service = require('../models/Service');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc        Get all Services
 * @route       GET /api/v1/services
 * @access      Private
 */
exports.getServices = (req, res, next) => {
  Service.find()
    .then((services) => {
      if (!services) {
        return next(new ErrorResponse('Services not found', 404));
      }
      res.status(200).json({
        success: true,
        services,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Get Service By ID
 * @route       GET /api/v1/services/:id
 * @access      Private
 */
exports.getService = (req, res, next) => {
  Service.findOne(req.params.is)
    .then((service) => {
      if (!service) {
        return next(new ErrorResponse('Service not found', 404));
      }
      res.status(200).json({
        success: true,
        service,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Create New Service
 * @route       POST /api/v1/services
 * @access      Private
 */
exports.createService = (req, res, next) => {
  // temp service variable
  const service = new Service({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  });
  // attempt to save service to database
  service
    .save()
    .then((service) => {
      res.status(201).json({
        success: true,
        service,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Update Service By ID
 * @route       PUT /api/v1/services/:id
 * @access      Private
 */
exports.updateService = (req, res, next) => {
  console.log(req.params);
  console.log(req.params._id);
  // console.log(req.body);
  Service.updateOne(
    // this was undefined
    // { _id: req.params._id },
    // trying this instead
    {_id : req.params.id},
    {
      // set fields to update
      $set: {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl
      },
    }
  )
    .then((service) => {
      if (service.nModified > 0) {
        res.status(200).json({
          success: true,
          service,
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
 * @desc        Get all Services
 * @route       DELETE /api/v1/services
 * @access      Private
 */
exports.deleteService = (req, res, next) => {
  Service.findById(req.params.id)
    .then((service) => {
      if (service.disabled === false) {
        service.disable();
      } else {
        service.enable();
      }
      res.status(200).json({
        success: true,
        service,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};
