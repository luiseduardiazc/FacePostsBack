'use strict';
const config = require('../config');

const mongoose = require('mongoose');

// Connect to DB

const dbSettings = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
mongoose.connect(config.mongo.DB_URL_CONNECTION, dbSettings, () => {
  console.log('connected to DB');
});
