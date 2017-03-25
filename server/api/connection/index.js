const debug = require('debug')('app:api:connection');
const WebSocket = require('ws');
const has = require('has');

const { actionHandlers } = require('./action');
const { getBreweries } = require('../db').brewery;
const UserState = require('./user/UserState');

require('./user');

class APIConnection {
  constructor(ws) {
    debug('ws connection made');

    this.ws = ws;
    this.userState = new UserState(this);

    this.messageNum = 0;
    this.lastAck = -1;
    this.stateSeq = 0;

    this.ackTimeouts = {};

    ws.on('message', (message) => {
      this.onMessage(message);
    });

    this.setState('breweries', getBreweries());

    ws.on('close', () => {
      clearTimeout(this.stateInterval);
      clearTimeout(this.changeInterval);
    });
  }

  onMessage(messageString) {
    let message;

    try {
      message = JSON.parse(messageString);
    } catch (e) {
      debug('received invalid json');
      return;
    }

    debug('received %s', messageString);

    if (has(message, 'action') && has(message, 'id')) {
      const action = message.action;
      const id = message.id;

      if (action === 'ack') {
        this.onAck(id);
        return;
      }

      if (actionHandlers[action] && has(message, 'params')) {
        debug('received %s action', action);

        const inputParams = message.params;
        const responseAction = 'response';

        actionHandlers[action](inputParams, this)
          .then((params) => {
            if (params.result) {
              const result = params.result;

              debug('Success: %s', JSON.stringify(result));

              const response = {
                action: responseAction,
                id,
                result,
              };

              this.ws.send(JSON.stringify(response));
            } else if (params.error) {
              const error = params.error;

              debug('Failure: %s', JSON.stringify(error));

              const response = {
                action: responseAction,
                id,
                error,
              };

              this.ws.send(JSON.stringify(response));
            }
          })
          .catch((error) => {
            debug('Failure: ', error);

            const response = {
              action: responseAction,
              id,
              error: 'Internal error',
            };

            this.ws.send(JSON.stringify(response));
          })
          .catch(Error, (err) => {
            debug('Failure: ', err);
          });
      } else {
        debug('received unhandled %s action', action);
      }
    }
  }

  onAck(messageID) {
    if (this.lastAck !== messageID - 1) {
      debug('Missed an ack!');
    }
    this.lastAck = messageID;

    const messageIDStr = String(messageID);
    clearTimeout(this.ackTimeouts[messageIDStr]);
    delete this.ackTimeouts[messageIDStr];
  }

  sendMessage(msgIn) {
    if (this.ws.readyState !== WebSocket.OPEN) {
      debug('Tried to send message on disconnected socket.');
      return;
    }

    const msg = msgIn;

    const ackNum = this.messageNum;
    this.messageNum += 1;
    msg.id = ackNum;

    const msgStr = JSON.stringify(msg);
    debug('sending: %s', msgStr);

    // this.ackTimeouts[String(ackNum)] = setTimeout(() => {
    //   debug('Timed out on ack ', ackNum);
    // }, 3000);

    this.ws.send(msgStr);
  }

  setState(key, state) {
    this.stateSeq += 1;
    this.sendMessage({
      action: 'state',
      key,
      state,
      stateSeq: this.stateSeq,
    });
  }

  patchState(key, state) {
    this.stateSeq += 1;
    this.sendMessage({
      action: 'update',
      key,
      state,
      stateSeq: this.stateSeq,
    });
  }

}

module.exports = { APIConnection };
