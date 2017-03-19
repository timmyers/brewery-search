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

  describe('usernameExists', function() {
    const goodUsername = 'timbo';
    const badUsername = 'fido';

    // Add a valid username before starting
    before(async function() {
      const user = {username: goodUsername, password: 'hunter6', email: 'hello@aol.com'};
      await collection.insertOne(user);
    });
    // Delete all users afterwards
    after(async function() {
      await collection.deleteMany({});
    });

    it('should return a promise', function() {
      user.usernameExists(goodUsername).should.be.a('Promise');
    });
    it('should return true if the username exists', function() {
      return user.usernameExists(goodUsername).should.eventually.be.true;
    });
    it('should return false if the username doesn\'t exists', function() {
      return user.usernameExists(badUsername).should.eventually.be.false;
    });
  });


  describe('usernameOrEmailExists', function() {
    const usedUsername = 'timbo';
    const usedEmail = 'hello@aol.com'
    const unusedUsername = 'fido';
    const unusedEmail = 'tom@myspace.com';

    // Add a valid user before starting
    before(async function() {
      const user = {username: usedUsername, password: 'hunter6', email: usedEmail};
      await collection.insertOne(user);
    });

    it('should return a promise', function() {
      user.usernameOrEmailExists(usedUsername).should.be.a('Promise');
    });
    it('should return if just the username exists', function() {
      return user.usernameOrEmailExists(usedUsername, unusedEmail).should.eventually.deep.equal({
        username: true,
      });
    });
    it('should return if just the email exists', function() {
      return user.usernameOrEmailExists(unusedUsername, usedEmail).should.eventually.deep.equal({
        email: true
      });
    });
    it('should return both exist if they do', function() {
      return user.usernameOrEmailExists(usedUsername, usedEmail).should.eventually.deep.equal({
        username: true,
        email: true
      });
    });
    it('should return neither exist if they don\'t', function() {
      return user.usernameOrEmailExists(unusedUsername, unusedEmail).should.eventually.equal(null);
    });
  });
};
