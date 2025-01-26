/**
 * Title: routes/services.js
 * Authors: Group 4
 * Description: bcrs-api
 */
const express = require('express');
const { getServices, getServicesDisplay, getService, createService, updateService, deleteService } = require('../controllers/service');

const router = express.Router();

// Service routes
// POST
router.post('/', createService);
// GET
router.get('/', getServices);
router.get('/display', getServicesDisplay);
router.get('/:id', getService);
// PUT
router.put('/:id', updateService);
// DELETE
router.delete('/:id', deleteService);

module.exports = router;
