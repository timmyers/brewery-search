const debug = require('debug')('app:api:db:user');
const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

let collection;

db.get()
  .then((dbConn) => {
    debug('got db connection');
    collection = dbConn.collection('User');
  });

function usernameExists(username) {
  return collection.count({ username }, { limit: 1 })
    .then(count => count > 0);
}

function usernameOrEmailExists(username, email) {
  const matchQuery = { $or: [{ username }, { email }] };
  const fields = { fields: { userID: 1, username: 1, email: 1 } };

  return collection.find(matchQuery, fields).toArray()
    .then((users) => {
      let exists = null;

      users.forEach((user) => {
        if (user.username === username) {
          if (!exists) {
            exists = { username: true };
          } else {
            exists.username = true;
          }
        }
        if (user.email === email) {
          if (!exists) {
            exists = { email: true };
          } else {
            exists.email = true;
          }
        }
      });

      debug(exists);
      return exists;
    });
}

function find(username, callback) {
  collection.findOne({ username }, { fields: { _id: 1, password: 1, userID: 1 } }, (err, user) => {
    if (err) {
      return callback(err);
    }
    return callback(null, user);
  });
}

function findByID(id, callback) {
  if (!ObjectID.isValid(id)) {
    callback(new Error('invalid object ID'));
    return;
  }

  const _id = new ObjectID(id);
  collection.findOne({ _id }, { fields: { password: 0 } }, (err, user) => {
    if (err) {
      return callback(err);
    }
    return callback(null, user);
  });
}

function add(user, callback) {
  const { username, password, email } = user;

  collection.insertOne({ username, password, email }, (err, result) => {
    debug(result);
    if (err) {
      callback(err);
      return;
    }

    const userID = result.insertedId;
    callback(null, userID);
  });
}

module.exports = { usernameExists, usernameOrEmailExists, find, findByID, add };
