'use strict';
require('./db');
const app = require('./app');
const config = require('./config');

const PORT = config.server.PORT || 3000;
const HOST = config.server.SERVER_HOSTNAME || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`api run http://${HOST}:${PORT}`);
});
