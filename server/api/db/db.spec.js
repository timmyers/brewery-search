/* eslint-disable */
const should = require('chai').should();
const Promise = require('bluebird');

const db = require('./db');

describe('db', function() {
  describe('get', function() {
    it('should be a function', function() {
      db.get.should.be.a('function');
    });
    it('should return a promise', function() {
      db.get().should.be.an.instanceOf(Promise);
    });
  });
});
