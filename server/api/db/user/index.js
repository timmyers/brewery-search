const debug = require('debug')('app:api:db:user');
const db = require('../db');

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

function usernameOrEmailExists(username, email, callback) {
  const matchQuery = { $or: [{ username }, { email }] };
  const fields = { fields: { userID: 1, username: 1, email: 1 } };
  collection.find(matchQuery, fields).toArray((err, users) => {
    if (err) {
      callback(err);
    }

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
    callback(null, exists);
  });
}

function find(username, callback) {
  collection.findOne({ username }, { fields: { password: 1, userID: 1 } }, (err, user) => {
    if (err) {
      return callback(err);
    }
    return callback(null, user);
  });
}

function findByUserID(userID, callback) {
  collection.findOne({ userID }, { fields: { password: 0 } }, (err, user) => {
    if (err) {
      return callback(err);
    }
    return callback(null, user);
  });
}

module.exports = { usernameExists, usernameOrEmailExists, find, findByUserID };
