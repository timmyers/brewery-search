/* eslint-disable */
const debug = require('debug')('test:db:user');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const user = require('../user');
const db = require('../db')

chai.use(chaiAsPromised);
chai.should()

let collection = db.get()
  .then((dbConn) => {
    debug('got db connection');
    return dbConn.collection('User');
  });

module.exports = function() {
  // Get the collection before starting
  before(async function() {
    collection = await collection;
  });

  it('should have a function called usernameExists', function() {
    user.usernameExists.should.be.a('function');
  });
  it('should have a function called usernameOrEmailExists', function() {
    user.usernameOrEmailExists.should.be.a('function');
  });
  it('should have a function called find', function() {
    user.find.should.be.a('function');
  });
  it('should have a function called findByID', function() {
    user.findByID.should.be.a('function');
  });

  // Test usernameExists
  describe('usernameExists', function() {
    const goodUsername = 'timbo';
    const badUsername = 'fido';

    before(async function() {
      const user = {username: goodUsername, password: 'hunter6', email: 'hello@aol.com'};
      await collection.insertOne(user);
    });
    after(async function() {
      await collection.deleteMany({});
    });

    it('should return a promise', function() {
      const result = user.usernameExists(goodUsername);
      result.should.be.a('Promise');
    });
    it('should return true if the username exists', function() {
      return user.usernameExists(goodUsername).should.eventually.be.true;
    });
    it('should return false if the username doesn\'t exists', function() {
      return user.usernameExists(badUsername).should.eventually.be.false;
    });
  });
};
