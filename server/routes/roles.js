/**
 * Title: routes/roles.js
 * Authors: Group 4
 * Description: bcrs-api
 */
const express = require('express');
const { getRoles, getRole, createRole, updateRole, deleteRole } = require('../controllers/role');

const router = express.Router();

// Role api endpoints
// GET
router.get('/', getRoles);
router.get('/:id', getRole);
// POST
router.post('/', createRole);
// PUT
router.put('/:id', updateRole);
// DELETE
router.delete('/:id', deleteRole);

module.exports = router;
