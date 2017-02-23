const debug = require('debug')('app:api:connection')

let actionHandlers = {}

function addActionHandler(action, callback) {
	debug("adding action handler for: %s", action);
	actionHandlers[action] = callback;
}

module.exports = { actionHandlers, addActionHandler }