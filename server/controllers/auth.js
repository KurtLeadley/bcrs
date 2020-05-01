/**
 * Title: controllers/auth.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SecurityQuestions = require('../models/SecurityQuestion');

/**
 * @desc        Register user
 * @route       POST /api/v1/auth/register
 * @access      Public
 */
exports.register = (req, res, next) => {
  // hash password before storing in database
  bcrypt
    .hash(req.body.password, 10) //set salt length?
    .then((hash) => {
      //on success
      const user = new User({
        username: req.body.username.toLowerCase(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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
 * @desc        Login user in
 * @route       POST /api/v1/auth/login
 * @access      Public
 */
exports.login = (req, res, next) => {
  // created a temp var
  let fetchedUser;
  // check user
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return next(new ErrorResponse('Authentication Failed', 401));
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (fetchedUser.disabled) {
        return next(new ErrorResponse('Account has beed disabled. Please contact your system admin.', 403));
      }

      if (!result) {
        return next(new ErrorResponse('Authentication Failed', 401));
      }

      const token = jwt.sign(
        {
          userId: fetchedUser._id,
          username: fetchedUser.username,
          role: fetchedUser.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userObjId: fetchedUser._id,
        username: fetchedUser.username,
        role: fetchedUser.role,
      });
    })
    .catch((err) => {
      console.log(err + '1st');
      return next(new ErrorResponse(`Internale Error: ${err.message}`, 500));
    })
    .catch((err) => {
      console.log(err + '2nd');
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Verify user by username
 * @route       GET /api/v1/auth/verify/users/:username
 * @access      Private
 */
exports.verifyUser = (req, res, next) => {
  User.countDocuments({ username: req.params.username.toLowerCase() })
    .then((user) => {
      let userExist;
      if (user) {
        userExist = true;
      } else {
        userExist = false;
      }
      res.status(200).json({
        success: true,
        userExist,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Update user details
 * @route       PUT /api/v1/auth/updatedetails
 * @access      Private
 */
exports.updateDetails = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    // find user by id to update
    User.updateOne(
      { _id: req.params.userId },
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
          password: hash,
          securityAnswers: req.body.securityAnswers,
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
          return next(new ErrorResponse('User not found', 404));
        }
      })
      .catch((err) => {
        return next(new ErrorResponse(`Internal Error: ${err.message}`));
      });
  });
};

/**
 * @desc        Update user profile
 * @route       PUT /api/v1/auth/profile/:userid
 * @access      Private
 */
exports.editProfile = (req, res, next) => {
  User.updateOne(
    { _: req.params.userid },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        dateModified: req.body.dateModified,
        securityAnswers: req.body.securityAnswers,
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
        return next(new ErrorResponse('User not found!', 404));
      }
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Reset Users Password
 * @route       PUT /api/v1/auth/verify/:username/reset-password
 * @access      Private
 */
exports.resetPassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    // update user
    User.updateOne(
      { username: req.params.username },
      {
        $set: {
          // fields to update
          password: hash,
        },
      }
    )
      .then((user) => {
        if (user.nModified > 0) {
          // success
          res.status(200).json({
            success: true,
            user,
          });
        } else {
          return next(new ErrorResponse('Not Authorized', 401));
        }
      })
      .catch((err) => {
        return next(new ErrorResponse(`Internal Error: ${err.message}`));
      });
  });
};

/**
 * @desc        Create Security Answers for User
 * @route       POST /api/v1/auth/users/:username/security-answers
 * @access      Private
 */
exports.createSecurityAnswers = (req, res, next) => {
  // Find user by username
  User.findOne({ username: req.params.username })
    .then((user) => {
      if (!user) {
        return next(new ErrorResponse('User not found', 404));
      }
      user.securityAnswers.push({
        questionId: req.body.questionId,
        answer: req.body.answer,
      });
      // save user
      user.save((err, user) => {
        if (err) {
          return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
        } else {
          res.status(201).json({
            success: true,
            user,
          });
        }
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`));
    });
};

/**
 * @desc        Find Users Security Questions
 * @route       GET /api/v1/auth/users/:username/security-questions
 * @access      Private
 */
exports.findSelectedSecurityQuestions = (req, res, next) => {
  // Find user by username
  User.findOne({ username: req.params.username }).then((user) => {
    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }
    if (!user.securityAnswers) {
      return next(new ErrorResponse('User security answers not found', 404));
    }
    if (user.securityAnswers.length === 0) {
      return next(new ErrorResponse('User security answers not found', 404));
    }
    let securityQuestionArray = [];
    SecurityQuestions.find()
      .then((questions) => {
        // sa = security answers
        user.securityAnswers.forEach((sa) => {
          // sq = security questions
          questions.forEach((sq) => {
            if (sq._id == sa.questionId) {
              securityQuestionArray.push([
                {
                  _id: sa.questionId,
                  text: sq.text,
                  disabled: sq.disabled,
                },
              ]);
            }
          });
        });
        // success
        res.status(200).json({
          success: true,
          securityQuestions: securityQuestionArray,
        });
      })
      .catch((err) => {
        return next(new ErrorResponse(`Internal Error: ${err.message}`));
      })
      .catch((err) => {
        return next(new ErrorResponse(`Internal Error: ${err.message}`));
      });
  });
};

/**
 * @desc        Verify Security Answers Exist
 * @route       GET /api/v1/auth/cerify/users/:username/security-answers
 * @access      Private
 */
exports.verifySecurityAnswersExist = (req, res, next) => {
  // filter user document
  User.aggregate([
    { $match: { username: req.params.username } },
    { $project: { securityAnswers: 1 } },
    { $unwind: '$securityAnswers' },
    { $group: { _id: 'result', answerCount: { $sum: 1 } } },
  ])
    .then((answers) => {
      let answerExist;
      if (answers.length === 0) {
        answerExist = false;
      } else {
        answerExist = true;
      }
      res.status(200).json({
        answerExist,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`, 500));
    });
};

/**
 * @desc        Check User Security Answers
 * @route       POST /api/v1/auth/verify/users/:username/security-answers
 * @access      Private
 */
exports.checkUserSecurityAnswers = (req, res, next) => {
  const answers = req.body;
  // find user
  User.findOne({ username: req.params.username })
    .then((user) => {
      if (!user) {
        return next(new ErrorResponse('User not found', 404));
      }
      correctAnswer = 0;

      if (answers[0].toString().toLowerCase() === user.securityAnswers[0].answer.toString().toLowerCase()) {
        correctAnswer++;
      }
      if (answers[1].toString().toLowerCase() === user.securityAnswers[1].answer.toString().toLowerCase()) {
        correctAnswer++;
      }
      if (answers[2].toString().toLowerCase() === user.securityAnswers[2].answer.toString().toLowerCase()) {
        correctAnswer++;
      }

      if (correctAnswer === user.securityAnswers.length) {
        // amount of right answers = amount of user security answers
        res.status(200).json({
          success: true,
          valid: true,
        });
      } else {
        res.status(200).json({
          success: true,
          valid: false,
        });
      }
    })
    .catch((err) => {
      return next(new ErrorResponse(`Internal Error: ${err.message}`));
    });
};
