const _ = require('lodash');

const db = require('../db')
const debug = require('debug')('app:api:db:brewery')

let breweryCollection;
let counterCollection;
let breweries;

function getBreweryIDSequence(callback) {
	const ret = counterCollection.findOneAndUpdate(
		{ _id: 'Brewery' },
		{ $inc: { sequence: 1 } },
		{},
		(err, ret) => {
			if (err) {
				debug('Error getting seq no: ' + err);
				return;
			}
			debug('Sequnce: ', ret.value.sequence);
			callback(ret.value.sequence);
		}
	);
}

function getBreweries() {
  return breweries.map(brewery => {
  	return _.pickBy(brewery, (value, key) => {
  		return key !== '_id';
  	});
  });
}

db.get()
	.then(dbConn => {
		debug('got db connection');
		breweryCollection = dbConn.collection('Brewery');
		counterCollection = dbConn.collection('Counter');

    breweryCollection.find({}, {}).toArray((err, docs) => {
      breweries = docs;

      breweries.forEach(brewery => {
      	if (!brewery.breweryID) {
      		debug(`Doesn't have ID: ${brewery.name}`);
      		debug(`Going to update ID for: ${brewery.name}, ${brewery._id}`);

      		getBreweryIDSequence(breweryID => {
      			breweryCollection.findOneAndUpdate(
		      		{ _id: brewery._id },
		      	  { $set: { breweryID } },
		      		{ returnOriginal: false },
		      		(err, ret) => {
								if (err) {
									debug('Error updating seq no: ' + err);
									return;
								}
								debug('Updated brewery: ' + JSON.stringify(ret));
							}
	    			);
      		});
      	}
      })
    });

   	// getBreweryIDSequence();
	});

module.exports = { getBreweries }
