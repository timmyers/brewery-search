const Promise = require("bluebird");
const MongoClient = require('mongodb').MongoClient;
const debug = require('debug')('app:api:db')

// Turn mongoDB callbacks into promises
Promise.promisifyAll(MongoClient);

// Connection URL
const url = 'mongodb://heroku_pn4vdj5h:ic2a038up7pjedvhq3s33eqjjn@ds155428.mlab.com:55428/heroku_pn4vdj5h'

let db = MongoClient.connectAsync(url)
  .then(db => {
    debug('MongoDB connection successful.')
    return db;
  })
  .catch(err => {
    debug('Failed to connect to MongoDB: ' + err);
    throw err;
  });


function get() {
  return db;
}

module.exports = { get }
