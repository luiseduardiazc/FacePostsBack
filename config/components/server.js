'use strict';

const config = {
  PORT: process.env.PORT || process.env.SERVER_PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  SERVER_HOSTNAME: process.env.HOST || process.env.SERVER_HOSTNAME
};

module.exports = config;
