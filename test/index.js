const debug = require('debug')('test:init');

const mongoDBInit = require('./dockerMongoDB');

debug('Setting up to run tests.');

mongoDBInit()
  .then(() => {
    debug('MongoDB container running.');
    process.exit(0);
  })
  .catch((err) => {
    debug('MongoDB container failed to start, failing: ', err);
    process.exit(1);
  });
