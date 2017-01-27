const MongoClient = require('mongodb').MongoClient
const debug = require('debug')('app:bin:api:db')

// Connection URL
var url = 'mongodb://heroku_pn4vdj5h:ic2a038up7pjedvhq3s33eqjjn@ds155428.mlab.com:55428/heroku_pn4vdj5h'

let db = null
let dbPromise = new Promise((resolve, reject) => {
  MongoClient.connect(url, (err, connectedDB) => {
    if (err) {
      debug('Failed to connect to MongoDB: ' + err)
      reject(err)
    }

    debug('MongoDB connection successful.')
    db = connectedDB
    resolve()
  })
})

let get = (callback) => {
  debug('get called')
  if (db) {
    debug('connection ready, returning connection')
    return callback(db)
  }
  debug('waiting on promise')
  return dbPromise.then(() => {
    debug('promise fulfilled, returning connection')
    callback(db)
  })
}

module.exports = { get }
