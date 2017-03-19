const debug = require('debug')('app:api:db:breweryVisit');
const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

let collection;

db.get()
  .then((dbConn) => {
    debug('got db connection');
    collection = dbConn.collection('BreweryVisit');
  });

function setVisit(userID, brewery, visited, callback) {
  if (!ObjectID.isValid(userID)) {
    callback(new Error('invalid object ID'));
    return;
  }

  const user = new ObjectID(userID);

  const filter = { user, brewery };
  const query = { $setOnInsert: { user, brewery }, $set: { visited } };
  collection.updateOne(filter, query, { upsert: true }, (err, result) => {
    if (err) {
      debug(err);
      callback(err);
      return;
    }
    debug(result);

    if (result.insertedCount !== 1) {
      debug('didn\'t update');
      // callback(new Error('failed to insert'));
      // return;
    }

    // const visitID = result.insertedId;
    callback(null);
  });
}

function getVisited(userID, callback) {
  if (!ObjectID.isValid(userID)) {
    callback(new Error('invalid object ID'));
    return;
  }

  const user = new ObjectID(userID);
  const filter = { user, visited: true };

  collection.find(filter).toArray((err, visits) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, visits);
  });
}

module.exports = { setVisit, getVisited };
