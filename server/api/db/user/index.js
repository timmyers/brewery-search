const db = require('../db');
const debug = require('debug')('app:api:db:user');

let collection;

db.get()
  .then((dbConn) => {
    debug('got db connection');
    collection = dbConn.collection('User');
  });

function usernameExists(username, callback) {
  collection.count({ username }, { limit: 1 }, (err, count) => {
    if (err) {
      callback(err);
    }

    callback(null, count > 0);
  });
}

function find(username, callback) {
  collection.findOne({ username }, { fields: { password: 1 } }, (err, user) => {
    if (err) {
      return callback(err);
    }
    return callback(null, user);
  });
}

module.exports = { usernameExists, find };
