const debug = require('debug')('app:api:user:state');
const _ = require('lodash');
const update = require('immutability-helper');
const SubscribableState = require('../SubscribableState');

const breweryVisitDB = require('../../db').breweryVisit;

const breweryVisitedState = {};

class UserState {
  constructor(connection) {
    this.connection = connection;

    this.state = new SubscribableState({ loggedIn: false });
    this.state.subscribe((state) => {
      if (_.isArray(state)) {
        debug('patching user state');
        this.connection.patchState('user', state);
      } else {
        debug('setting user state');
        this.connection.setState('user', state);
      }
    });
  }

  logIn(user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.admin = user.id === '58d068a21e1352ec1b96394d'; // me!

    debug('Setting mongoID: ', this.id);

    if (_.has(breweryVisitedState, this.id)) {
      debug('Already constructed breweriesVisited');
    } else {
      debug('Haven\'t yet constructed this breweriesVisited');

      const subscribableState = new SubscribableState();
      breweryVisitedState[this.id] = subscribableState;

      breweryVisitDB.getVisited(this.id)
        .then((visited) => {
          subscribableState.setState(state => update(state, {
            visited: { $set: visited },
          }));
        });
    }

    breweryVisitedState[this.id].subscribe((state) => {
      if (_.isArray(state)) {
        this.connection.patchState('breweriesVisited', state);
      } else {
        this.connection.setState('breweriesVisited', state);
      }
    });

    this.state.setState(state => update(state, {
      loggedIn: { $set: true },
      username: { $set: this.username },
      email: { $set: this.email },
      admin: { $set: this.admin },
    }));

    this.loggedIn = true;
  }

  breweryVisited(breweryID, visited) {
    let op;
    if (visited) {
      op = { $push: [breweryID] };
    } else {
      op = { $apply: (arr => arr.filter(x => x !== breweryID)) };
    }
    breweryVisitedState[this.id].setState(state => update(state, {
      visited: op,
    }));
  }
}

module.exports = UserState;
