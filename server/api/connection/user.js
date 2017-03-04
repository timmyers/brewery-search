const Promise = require('bluebird');
const debug = require('debug')('app:api:connection:user');
const bcrypt = require('bcrypt');
const { addActionHandler } = require('./action');
const db = require('../db');

const userDB = db.user;

function login(params, connection) {
  return new Promise((resolve, reject) => {
    const username = params.username;
    const password = params.password;

    userDB.find(username, (err, user) => {
      //  Error retriving user info from db
      if (err) {
        reject(new Error('Error finding user.'));
      } else if (!user) {
        resolve({
          error: {
            username: 'Username not found.',
          },
        });
      } else {
        debug('user: %s', JSON.stringify(user));

        bcrypt.compare(password, user.password, (bcryptErr, res) => {
          if (bcryptErr) {
            debug('bcrypt error: ', bcryptErr);
            return reject(new Error('Bcrypt error.'));
          }

          debug('bcrypt result: ', res);

          if (!res) {
            return resolve({
              error: {
                password: 'Incorrect password.',
              },
            });
          }

          resolve({ result: true });

          return connection.setState('user', { username });
        });
      }
    });
  });
}

addActionHandler('login', login);
