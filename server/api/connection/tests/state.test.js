/* eslint-disable */
const debug = require('debug')('test:connection:state');
const chai = require("chai");
const SubscribableState = require('../SubscribableState');

chai.should();

describe('SubscribableState', function() {
  it('should work', function() {
    const s = new SubscribableState();
    s.subscribe(state => debug(state));
    s.setState((state) => {
      state.y = {
        hello: 'world'
      };
      return Promise.resolve();
    });
  });
});
