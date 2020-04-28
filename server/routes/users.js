/**
 * Title: routes/users.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserRole,
  getUserByUsername,
  updateAvatar,
  deleteAvatar,
} = require('../controllers/users');

const router = express.Router();
// User api endpoints
// GET
router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/username/:username', getUserByUsername);
router.get('/:username/role', getUserRole);
// POST
router.post('/', createUser);
// PUT
router.put('/:id', updateUser);
router.put('/avatar/:id', updateAvatar);
// DELETE
router.delete('/:id', deleteUser);
router.delete('/avatar/:id', deleteAvatar);

module.exports = router;
