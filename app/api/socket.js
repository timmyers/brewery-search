import Websocket from 'reconnecting-websocket';
import Promise from 'bluebird';
import { setState, updateState } from './actions';

let dispatch;

// Build up the proper URL
const loc = window.location;
let wsUri;
if (loc.protocol === 'https:') {
  wsUri = 'wss:';
} else {
  wsUri = 'ws:';
}
wsUri += `//${loc.host}`;
wsUri += '/api';

const ws = new Websocket(wsUri);

let messageID = 0;

const responseResolvers = {};

ws.addEventListener('open', () => {
  console.log('socket connected');
  // this.props.connected(true)
});

ws.addEventListener('close', () => {
  console.log('socket disconnected');
  // this.props.connected(false)
});

ws.addEventListener('message', (event) => {
  const data = event.data;
  // console.log('API message: ' + data)
  try {
    const json = JSON.parse(data);

    if (json.action) {
      const action = json.action;
      // console.log('Received action: ' + action)
      if (action === 'response') {
        const id = String(json.id);

        if (responseResolvers[id]) {
          const resolve = responseResolvers[id];

          if (json.result) {
            const result = json.result;
            resolve({ result });
          } else if (json.error) {
            const error = json.error;
            resolve({ error });
          }
        }
      } else if (action === 'state') {
        const id = json.id;

        const ack = {
          action: 'ack',
          id,
        };
        ws.send(JSON.stringify(ack));

        const state = json.state;
        dispatch(setState(state));
      } else if (action === 'update') {
        const id = json.id;

        const ack = {
          action: 'ack',
          id,
        };
        ws.send(JSON.stringify(ack));

        const update = json.update;
        dispatch(updateState(update));
      }
    }
  } catch (e) {
    console.log('Got invalid JSON message');
  }
});

function request(action, params) {
  const id = messageID;
  messageID += 1;
  const idstr = String(id);

  const msg = {
    action,
    params,
    id,
  };

  const p = new Promise((resolve, reject) => {
    const rejectTimeout = setTimeout(() => {
      reject(new Error('timeout'));
      delete responseResolvers[idstr];
    }, 5000);

    responseResolvers[idstr] = (result) => {
      clearTimeout(rejectTimeout);
      resolve(result);
      delete responseResolvers[idstr];
    };
  });

  ws.send(JSON.stringify(msg));

  return p;
}

function setDispatch(dispatchIn) {
  dispatch = dispatchIn;
}

export { request, setDispatch };
