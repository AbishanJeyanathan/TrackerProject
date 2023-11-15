const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')

/**
 *  App Routes
 */
router.get('/', controller.homepage);

module.exports = router;
