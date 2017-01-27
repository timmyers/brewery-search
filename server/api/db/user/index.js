const db = require('../db')
// const debug = require('debug')('app:bin:api:db:user')

let collection

db.get((dbConn) => {
  collection = dbConn.collection('User')
})

let usernameExists = (username, callback) => {
  collection.count({ username }, { limit: 1 }, (err, count) => {
    if (err) {
      callback(err)
    }

    callback(null, count > 0)
  })
}

let find = (username, callback) => {
  collection.findOne({ username }, { fields: { password: 1 } }, (err, user) => {
    if (err) {
      return callback(err)
    }
    callback(null, user)
  })
}

module.exports = { usernameExists, find }
