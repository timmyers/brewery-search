const debug = require('debug')('app:api:user:state');

class UserState {
  setMongoID(mongoID) {
    debug('Setting mongoID: ', mongoID);
    this.mongoID = mongoID;
  }

}

module.exports = UserState;
