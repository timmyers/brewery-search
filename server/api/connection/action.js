const debug = require('debug')('app:api:connection');

const actionHandlers = {};

function addActionHandler(action, callback) {
  debug('adding action handler for: ', action);
  actionHandlers[action] = callback;
}

module.exports = { actionHandlers, addActionHandler };
