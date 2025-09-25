const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/auth/register', userController.signin);
router.post('/auth/login', userController.login);
router.get('/users/:id', userController.getById);

module.exports = router;