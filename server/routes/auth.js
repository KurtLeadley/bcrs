/**
 * Title: routes/auth.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require('../controllers/auth');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);

router.put('/resetPassword/:resettoken', resetPassword);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

router.get('/me', protect, getMe);
router.get('/logout', logout);

module.exports = router;
