const Promise = require('bluebird');
const debug = require('debug')('app:api:connection:user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { addActionHandler } = require('./action');
const db = require('../db');

const userDB = db.user;

const JWT_SECRET = 'shhfdsfdaskfda;fjk;a';

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
            reject(new Error('Bcrypt error.'));
            return;
          }

          debug('bcrypt result: ', res);

          if (!res) {
            resolve({
              error: {
                password: 'Incorrect password.',
              },
            });
            return;
          }

          const userID = user.userID;
          const token = jwt.sign({ userID }, JWT_SECRET);
          debug(`generated jwt: ${token}`);

          connection.setState('user', { username });
          resolve({ result: { token } });
        });
      }
    });
  });
}

function authorize(params, connection) {
  return new Promise((resolve, reject) => {
    const token = params.token;
    debug('received authorize token: ', token);

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        resolve({ error: 'Invalid token.' });
        return;
      }
      debug(decoded);

      const userID = decoded.userID;

      userDB.findByUserID(userID, (findUserErr, user) => {
        if (findUserErr) {
          reject({ error: 'Couldn\'t authorize.' });
          return;
        }

        debug('auth token was for user: ', user);

        const username = user.username;
        connection.setState('user', { username });

        resolve({ result: true });
      });
    });
  });
}

addActionHandler('login', login);
addActionHandler('authorize', authorize);
