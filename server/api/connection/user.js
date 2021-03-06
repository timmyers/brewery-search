const Promise = require('bluebird');
const debug = require('debug')('app:api:connection:user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { addActionHandler } = require('./action');
const db = require('../db');

const userDB = db.user;
const breweryVisitDB = db.breweryVisit;

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

          const userID = user._id;
          const token = jwt.sign({ userID }, JWT_SECRET);
          debug(`generated jwt: ${token}`);

          connection.userState.logIn({ id: userID, username, email: user.password });

          resolve({ result: { token } });
        });
      }
    });
  });
}

function register(params, connection) {
  return new Promise((resolve, reject) => {
    const username = params.username;
    const email = params.email;
    const password = params.password;

    debug('register', username, email, password);

    userDB.usernameOrEmailExists(username, email)
      .then((exists) => {
        if (exists) {
          const error = {};

          if (exists.username) {
            error.username = 'Username already exists';
          }
          if (exists.email) {
            error.email = 'Email already exists';
          }

          resolve({ error });
          return;
        }

        const saltRounds = 12;
        bcrypt.hash(password, saltRounds, async (bcryptErr, encryptedPassword) => {
          if (bcryptErr) {
            reject(bcryptErr);
            return;
          }

          debug('adding new user', username, email);
          const userID = await userDB.add({ username, email, password: encryptedPassword });

          const token = jwt.sign({ userID }, JWT_SECRET);
          debug(`generated jwt: ${token}`);

          connection.userState.logIn({ id: userID, username, email });

          resolve({ result: { token } });
        });
      })
      .catch(() => {
        reject(new Error('DB error.'));
      });
  });
}

function authorize(params, connection) {
  return new Promise((resolve) => {
    const token = params.token;
    debug('received authorize token: ', token);

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        resolve({ error: 'Invalid token.' });
        return;
      }
      debug(decoded);

      const userID = decoded.userID;

      userDB.findByID(userID, (findUserErr, user) => {
        if (findUserErr) {
          resolve({ error: 'Couldn\'t authorize.' });
          return;
        } else if (!user) {
          resolve({ error: 'User not found for token.' });
          return;
        }

        debug('auth token was for user: ', user);

        const username = user.username;
        const email = user.email;
        connection.userState.logIn({ id: userID, username, email });

        resolve({ result: true });
      });
    });
  });
}

function logout(params, connection) {
  return new Promise((resolve) => {
    connection.setState('user', null);
    resolve({ result: true });
  });
}

function visitBrewery(params, connection) {
  const breweryID = params.brewery;
  const visited = params.visited;
  const userID = connection.userState.id;

  debug('visitBrewery', breweryID, userID, visited);

  return breweryVisitDB.setVisited(userID, breweryID, visited)
    .then(() => {
      connection.userState.breweryVisited(breweryID, visited);
      return { result: true };
    });
}

addActionHandler('login', login);
addActionHandler('register', register);
addActionHandler('logout', logout);
addActionHandler('authorize', authorize);
addActionHandler('visitBrewery', visitBrewery);
