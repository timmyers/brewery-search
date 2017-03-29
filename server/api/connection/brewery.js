const debug = require('debug')('app:api:connection:brewery');

const { addActionHandler } = require('./action');
const db = require('../db');

const breweryDB = db.brewery;

function addBrewery(params) {
  const { name, lat, lng, imgSrc } = params;
  debug('addBrewery', name, lat, lng, imgSrc);

  return breweryDB.addBrewery(name, lat, lng, imgSrc)
    .then(() => ({ result: true }));
}

addActionHandler('addBrewery', addBrewery);
