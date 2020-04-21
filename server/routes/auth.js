/**
 * Title: routes/auth.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const express = require('express');
const {
  register,
  login,
  verifyUser,
  updateDetails,
  resetPassword,
  createSecurityAnswers,
  findSelectedSecurityQuestions,
  verifySecurityAnswersExist,
  checkUserSecurityAnswers,
} = require('../controllers/auth');
const router = express.Router();

// POST
router.post('/register', register);
router.post('/login', login);
router.post('/users/:username/security-answers', createSecurityAnswers);
router.post('/verify/users/:username/security-answers', checkUserSecurityAnswers);
// GET
router.get('/verify/users/:username', verifyUser);
router.get('/users/:username/security-questions', findSelectedSecurityQuestions);
router.get('/verify/users/:username/security-answers', verifySecurityAnswersExist);
// PUT
router.patch('/verify/:username/reset-password', resetPassword);
router.put('/update-profile/:userId', updateDetails);

module.exports = router;
