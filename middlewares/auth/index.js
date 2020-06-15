'use strict';

const singupValidate = require('./singupValidate');
const verifyToken = require('./verifyToken');
const middlewares = {
  singupValidate,
  verifyToken
};

module.exports = middlewares;
