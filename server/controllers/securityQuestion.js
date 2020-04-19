/**
 * Title: controllers/SecurityQuestions.js
 * Author: Loren Wetzel
 * Description: bcrs-api
 */
const ErrorResponse = require('../utils/errorResponse');
const SecurityQuestion = require('../models/SecurityQuestion');

/**
 * @desc        Get all security questions
 * @route       GET /api/v1/security-questions
 * @access      Private/admin
 */
exports.getSecQuestions = (req, res, next) => {
  SecurityQuestion.find()
    // sq = SecurityQuestions
    .then((sq) => {
      if (!sq) {
        return next(new ErrorResponse('Security Questions not found', 404));
      }
      res.status(200).json({
        success: true,
        questions: sq,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Get security question by id
 * @route       GET /api/v1/security-questions/:id
 * @access      Private/admin
 */
exports.getSecQuestion = (req, res, next) => {
  // find security question by id
  SecurityQuestion.findById(req.params.id)
    // sq = security question
    .then((sq) => {
      if (sq) {
        res.status(200).json({
          success: true,
          question: sq,
        });
      } else {
        return next(new ErrorResponse('Security Question not found', 404));
      }
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`));
    });
};

/**
 * @desc        Create security question
 * @route       POST /api/v1/security-questions
 * @access      Private/admin
 */
exports.createSecQuestion = (req, res, next) => {
  const securityQuestion = new SecurityQuestion({
    text: req.body.text,
  });
  // save security question
  securityQuestion
    .save()
    // sq = security question
    .then((sq) => {
      res.status(201).json({
        success: true,
        question: sq,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`));
    });
};

/**
 * @desc        Update security question by id
 * @route       PUT /api/v1/security-questions/:id
 * @access      Private/admin
 */
exports.updateSecQuestion = (req, res, next) => {
  // find security question to update
  SecurityQuestion.updateOne(
    { _id: req.params.id },
    {
      $set: {
        // fields to update
        text: req.body.text,
      },
    }
  )
    // sq = security question
    .then((sq) => {
      if (sq.nModified > 0) {
        res.status(200).json({
          success: true,
          question: sq,
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
 * @desc        Delete security questions by id ** set isDisabled = true **
 * @route       DELETE /api/v1/security-questions/:id
 * @access      Private/admin
 */
exports.deleteSecQuestion = (req, res, next) => {
  SecurityQuestion.findById(req.params.id)
    .then((question) => {
      if (question.disabled === false) {
        question.disable();
      } else {
        question.enable();
      }
      res.status(200).json({
        success: true,
        question,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`));
    });
};

/**
 * @desc        Get an array of security questions by id's
 * @route       GET /api/v1/security-questions/
 * @access      Private/admin
 */
exports.getSecQuestionsByIds = (req, res, next) => {
  const ids = req.body;
  // find security questions by id
  SecurityQuestion.find()
    .where('_id')
    .in(ids)
    // sq = security questions
    .then((sq) => {
      if (!sq) {
        return next(new ErrorResponse('Security Questions not found', 404));
      }
      res.status(200).json({
        success: true,
        question: sq,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};
