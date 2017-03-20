/* eslint-disable */
const debug = require('debug')('test:db:user');
const ObjectID = require('mongodb').ObjectID;
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const userDB = require('../user');
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
    userDB.usernameExists.should.be.a('function');
  });
  it('should have a function called usernameOrEmailExists', function() {
    userDB.usernameOrEmailExists.should.be.a('function');
  });
  it('should have a function called find', function() {
    userDB.find.should.be.a('function');
  });
  it('should have a function called findByID', function() {
    userDB.findByID.should.be.a('function');
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
      userDB.usernameExists(goodUsername).should.be.a('Promise');
    });
    it('should return true if the username exists', function() {
      return userDB.usernameExists(goodUsername).should.eventually.be.true;
    });
    it('should return false if the username doesn\'t exists', function() {
      return userDB.usernameExists(badUsername).should.eventually.be.false;
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
      userDB.usernameOrEmailExists(usedUsername).should.be.a('Promise');
    });
    it('should return if just the username exists', function() {
      return userDB.usernameOrEmailExists(usedUsername, unusedEmail).should.eventually.deep.equal({
        username: true,
      });
    });
    it('should return if just the email exists', function() {
      return userDB.usernameOrEmailExists(unusedUsername, usedEmail).should.eventually.deep.equal({
        email: true
      });
    });
    it('should return both exist if they do', function() {
      return userDB.usernameOrEmailExists(usedUsername, usedEmail).should.eventually.deep.equal({
        username: true,
        email: true
      });
    });
    it('should return neither exist if they don\'t', function() {
      return userDB.usernameOrEmailExists(unusedUsername, unusedEmail).should.eventually.equal(null);
    });
  });

  describe('add', function() {
    const username = 'timbo';
    const email = 'hello@aol.com'
    const password = 'hunter6';
    const user = { username, email, password };

    // Delete all users afterwards
    afterEach(async function() {
      await collection.deleteMany({});
    });

    it('should return a promise', function() {
      userDB.add(user).should.be.a('Promise');
    });

    it('should successfully add a user and return the ID', async function() {
      const userID = await userDB.add(user);
      ObjectID.isValid(userID).should.be.true;
    });
  });
};
