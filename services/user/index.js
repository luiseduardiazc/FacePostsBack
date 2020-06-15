'use strict';

const User = require('../../models/user.model');

const getUser = (query) => {
  return User.findOne(query);
};

module.exports = {
  getUser
};
