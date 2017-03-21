const debug = require('debug')('app:api:db:breweryVisit');
const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

let collection;

db.get()
  .then((dbConn) => {
    debug('got db connection');
    collection = dbConn.collection('BreweryVisit');
  });

function setVisited(userID, brewery, visited = true) {
  const user = new ObjectID(userID);

  const filter = { user, brewery };

  if (visited) {
    const query = { $setOnInsert: { user, brewery } };

    return collection.updateOne(filter, query, { upsert: true })
      .then(() => null);
  }

  return collection.deleteOne(filter)
    .then(() => null);
}

function getVisited(userID) {
  const user = new ObjectID(userID);

  const filter = { user };
  return collection.find(filter).toArray()
    .then(visitedDocs => visitedDocs.map(doc => doc.brewery));
}

module.exports = { setVisited, getVisited };
