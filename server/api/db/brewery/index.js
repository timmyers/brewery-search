const _ = require('lodash');

const db = require('../db');
const debug = require('debug')('app:api:db:brewery');

let breweryCollection;
let counterCollection;
let breweries;

function getBreweryIDSequence() {
  return counterCollection.findOneAndUpdate(
    { _id: 'Brewery' },
    { $inc: { sequence: 1 } },
    {})
    .then(ret => ret.value.sequence);
}

function getBreweries() {
  return breweries.map(brewery => (
    _.pickBy(brewery, (value, key) => key !== '_id')
  ));
}

async function addBrewery(name, lat, lng, imgSrc) {
  const breweryID = await getBreweryIDSequence();
  const doc = { name, lat, lng, imgSrc, breweryID };

  return breweryCollection.insertOne(doc);
}

db.get()
  .then((dbConn) => {
    debug('got db connection');
    breweryCollection = dbConn.collection('Brewery');
    counterCollection = dbConn.collection('Counter');

    breweryCollection.find({}, {}).toArray((err, docs) => {
      breweries = docs;

      breweries.forEach((brewery) => {
        if (!brewery.breweryID) {
          debug(`Doesn't have ID: ${brewery.name}`);
          debug(`Going to update ID for: ${brewery.name}, ${brewery._id}`);

          getBreweryIDSequence()
            .then((breweryID) => {
              breweryCollection.findOneAndUpdate(
                { _id: brewery._id },
                { $set: { breweryID } },
                { returnOriginal: false },
                (updateIDErr, ret) => {
                  if (updateIDErr) {
                    debug(`Error updating seq no: ${updateIDErr}`);
                    return;
                  }
                  debug(`Updated brewery: ${JSON.stringify(ret)}`);
                }
              );
            });
        }
      });
    });
  });

module.exports = { getBreweries, addBrewery };
