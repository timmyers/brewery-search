const Promise = require("bluebird");
const debug = require('debug')('app:api:connection:user')
const bcrypt = require('bcrypt')
const { addActionHandler } = require('./action');
const db = require('../db');

const userDB = db.user;

function login(params) {
	return new Promise((resolve, reject) => {
		let username = params.username
	  let password = params.password

	  userDB.find(username, (err, user) => {
	    //  Error retriving user info from db
	    if (err) {
	      reject(new Error('Error finding user.'));
	    } else {
	      if (!user) {
	        resolve({
	        	error: {
		          username: 'Username not found.'
	        	}
	        });
	      } else {
	        debug('user: %s', JSON.stringify(user))

	        bcrypt.compare(password, user.password, (err, res) => {
	          if (err) {
	            debug('bcrypt error: ' + err)
	            reject(new Error('Bcrypt error.'));
	          }

	          debug('bcrypt result: ' + res)

	          if (!res) {
	            resolve({
	            	error: {
		              password: 'Incorrect password.'
	            	}
	            })
	          }

	          resolve({
	          	result: true
	          });
	        });
	      }
	    }
	  })
	});
}

addActionHandler('login', login);