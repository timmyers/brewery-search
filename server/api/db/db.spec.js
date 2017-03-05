/* eslint-disable */
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const MongoDb = require('mongodb').Db;

chai.use(chaiAsPromised);
const should = chai.should();

const db = require('./db');

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
});
