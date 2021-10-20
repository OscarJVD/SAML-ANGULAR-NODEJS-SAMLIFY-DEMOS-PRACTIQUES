const express = require('express')
const router = express.Router();
const loginController = require('../controllers/login.controller');

router.post('/user_exists', loginController.user_exists);

module.exports = router;