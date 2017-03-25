// const debug = require('debug')('app:api:user:state');
const jsonpatch = require('fast-json-patch');

class SubscribableState {
  constructor(initialState) {
    this.state = initialState || {};
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    callback(this.state);
  }

  setState(callback) {
    const newState = callback(this.state);

    const patches = jsonpatch.compare(this.state, newState);
    this.listeners.forEach((listener) => {
      listener(patches);
    });
    this.state = newState;
  }
}

module.exports = SubscribableState;
