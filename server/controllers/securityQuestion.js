/**
 * Title: controllers/SecurityQuestions.js
 * Author: Loren Wetzel
 * Description: bcrs-api
 */
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const SecurityQuestion = require("../models/SecurityQuestion");

/**
 * @desc        Get all security questions
 * @route       GET /api/v1/security-questions
 * @access      Private/admin
 */
exports.getSecQuestions = asyncHandler(async (req, res, next) => {
  const questiions = await SecurityQuestion.find({}, (err, questions) => {
    if (err) {
      return next(
        new ErrorResponse("Problem getting the security questions!", 500)
      );
    }

    res.status(200).json({
      success: true,
      data: questions,
    });
  });
});

/**
 * @desc        Get security question by id
 * @route       GET /api/v1/security-questions/:id
 * @access      Private/admin
 */
exports.getSecQuestion = asyncHandler(async (req, res, next) => {
  const question = await SecurityQuestion.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: question,
  });
});

/**
 * @desc        Create security question
 * @route       POST /api/v1/security-questions
 * @access      Private/admin
 */
exports.createSecQuestion = asyncHandler(async (req, res, next) => {
  const question = await SecurityQuestion.create(req.body);

  res.status(201).json({
    success: true,
    data: question,
  });
});

/**
 * @desc        Update security question by id
 * @route       PUT /api/v1/security-questions/:id
 * @access      Private/admin
 */
exports.updateSecQuestion = asyncHandler(async (req, res, next) => {
  const fieldToUpdate = {
    text: req.body.text,
  };

  const question = await SecurityQuestion.findByIdAndUpdate(
    req.params.id,
    fieldToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: question,
  });
});

/**
 * @desc        Delete security questions by id ** set isDisabled = true **
 * @route       PATCH /api/v1/security-questions/:id
 * @access      Private/admin
 */
exports.deleteSecQuestion = asyncHandler(async (req, res, next) => {
  const question = await SecurityQuestion.findById(req.params.id);

  if (question.disabled === false) {
    question.disable();
  } else {
    question.enable();
  }

  res.status(200).json({
    success: true,
    data: question,
  });
});

/**
 * @desc        Get an array of security questions by id's
 * @route       GET /api/v1/security-questions/
 * @access      Private/admin
 */
