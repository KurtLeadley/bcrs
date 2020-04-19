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
  getSecQuestionsByIds,
} = require('../controllers/securityQuestion');

const router = express.Router();

// Security Questions endpoints
// GET
router.get('/', getSecQuestions);
router.get('/:id', getSecQuestion);
// POST
router.post('/', createSecQuestion);
router.post('/by-ids', getSecQuestionsByIds);
// PUT
router.put('/:id', updateSecQuestion);
// DELETE
router.delete('/:id', deleteSecQuestion);

module.exports = router;
