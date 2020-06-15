'use strict';

const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const middlewares = require('../middlewares/auth/');

router.post('/singin', authController.singIn);

router.post('/singup', middlewares.singupValidate, authController.singUp);

module.exports = router;
