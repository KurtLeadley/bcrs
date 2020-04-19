/**
 * Title: routes/users.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const express = require('express');
const { getUsers, getUser, createUser, updateUser, deleteUser, getUserRole } = require('../controllers/users');

const router = express.Router();
// User api endpoints
// GET
router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/:username/role', getUserRole);
// POST
router.post('/', createUser);
// PUT
router.put('/:id', updateUser);
// DELETE
router.delete('/:id', deleteUser);

module.exports = router;
