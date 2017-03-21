/* eslint-disable */
const debug = require('debug')('test:db:user');
const ObjectID = require('mongodb').ObjectID;
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const visitDB = require('../breweryVisit');
const db = require('../db')

chai.use(chaiAsPromised);
chai.should()

let collection = db.get()
  .then((dbConn) => {
    debug('got db connection');
    return dbConn.collection('BreweryVisit');
  });

module.exports = function() {
  // Get the collection before starting
  before(async function() {
    collection = await collection;
  });

  it('should have a function called setVisited', function() {
    visitDB.setVisited.should.be.a('function');
  });

  describe('setVisited', function() {
    const invalidUserID = '1234';
    const userID = new ObjectID(1);
    const breweryID = new ObjectID(1);

    // Delete all docs afterwards
    after(async function() {
      await collection.deleteMany({});
    });

    it('should throw an error if an invalid userID is provided', async function() {
      (() => visitDB.setVisited(invalidUserID, breweryID)).should.throw(Error);
    });

    it('should add a new entry when setting to true', function() {
      return visitDB.setVisited(userID, breweryID).should.be.fulfilled.then(function() {
        const query = { user: userID, brewery: breweryID };
        return collection.findOne(query).should.eventually.not.be.null;
      });
    });

    it('should delete an entry when setting to false', function() {
      return visitDB.setVisited(userID, breweryID, false).should.be.fulfilled.then(function() {
        const query = { user: userID, brewery: breweryID };
        return collection.count(query).should.eventually.equal(0);
      });
    });

  });
};
