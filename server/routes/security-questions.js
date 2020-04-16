/**
 * Title: routes/security-questions.js
 * Author: Loren Wetzel
 * Description: bcrs-api
 */
const express = require('express');
const {
  getSecQuestions,
  getSecQuestion,
  createSecQuestion,
  updateSecQuestion,
  deleteSecQuestion,
} = require('../controllers/securityQuestion');
const SecurityQuestion = require('../models/SecurityQuestion');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .get(advancedResults(SecurityQuestion), getSecQuestions)
  .post(createSecQuestion);

router
  .route('/:id')
  .get(getSecQuestion)
  .put(updateSecQuestion)
  .delete(deleteSecQuestion);

module.exports = router;
