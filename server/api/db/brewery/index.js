const db = require('../db')
const debug = require('debug')('app:api:db:brewery')

let collection

let breweries;

db.get()
	.then(dbConn => {
		debug('got db connection');
		collection = dbConn.collection('Brewery');

    collection.find({}, {_id: 0}).toArray((err, docs) => {
      breweries = docs;
      debug(breweries)
    });
	});

function getBreweries() {
  return breweries
}

module.exports = { getBreweries }
