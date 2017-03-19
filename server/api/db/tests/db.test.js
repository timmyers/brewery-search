/* eslint-disable */
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const MongoDb = require('mongodb').Db;
const db = require('../db');

chai.use(chaiAsPromised);
chai.should();

describe('db', function() {
  describe('get', function() {
    it('should be a function', function() {
      db.get.should.be.a('function');
    });
    it('should return a promise', function() {
      return db.get().should.be.a('Promise');
    });
    it('should connect successfully', function() {
      return db.get().should.eventually.be.an.instanceOf(MongoDb);
    });
  });

  describe('user', require('./user.test.js'));
});
