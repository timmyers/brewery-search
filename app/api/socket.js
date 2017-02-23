import Websocket from 'reconnecting-websocket'
import Promise from 'bluebird'
import { setState, updateState } from './actions'

let dispatch

// Build up the proper URL
let loc = window.location, wsUri;
if (loc.protocol === "https:") {
    wsUri = "wss:";
} else {
    wsUri = "ws:";
}
wsUri += "//" + loc.host;
wsUri += "/api";

let ws = new Websocket(wsUri)

let messageID = 0;

let responseResolvers = {};

ws.addEventListener('open', () => {
	console.log('socket connected')
	// this.props.connected(true)
})

ws.addEventListener('close', () => {
	console.log('socket disconnected')
	// this.props.connected(false)
})

ws.addEventListener('message', (event) => {
	let data = event.data
	// console.log('API message: ' + data)
	try {
		let json = JSON.parse(data)

		if (json.action) {
			let action = json.action;
			// console.log('Received action: ' + action)
			if (action == "response") {
				let id = String(json.id);

				if (responseResolvers[id]) {
					let resolve = responseResolvers[id];
					if (json.result) {
						let result = json.result;
						resolve({result});
					}
					else if (json.error) {
						let error = json.error;
						resolve({error});
					}
				}
			}
			else if (action == "state") {
				let id = json.id;

				let ack = {
					action: 'ack',
					id
				}
				ws.send(JSON.stringify(ack));

				let state = json.state;
				dispatch(setState(state));
			}
			else if (action == "update") {
				let id = json.id;

				let ack = {
					action: 'ack',
					id
				}
				ws.send(JSON.stringify(ack));

				let update = json.update;
				dispatch(updateState(update));
			}
		}
	}
	catch (e) {
		console.log('Got invalid JSON message')
	}
})

function request(action, params) {
	let id = messageID++;
	let idstr = String(id);

	let msg = {
		action,
		params,
		id
	}

	let p = new Promise((resolve, reject) => {
		let rejectTimeout = setTimeout(() => {
			reject(new Error('timeout'));
			delete responseResolvers[idstr];
		}, 5000);

		responseResolvers[idstr] = (result) => {
			clearTimeout(rejectTimeout);
			resolve(result);
			delete responseResolvers[idstr];
		};
	});

	ws.send(JSON.stringify(msg))

	return p;
}

function setDispatch(dispatchIn) {
	dispatch = dispatchIn
}

export { request, setDispatch }