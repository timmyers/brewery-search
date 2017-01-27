import Websocket from 'reconnecting-websocket'

export default class ApiWS {
	constructor() {
		// Build up the proper URL
		let loc = window.location, wsUri;
		if (loc.protocol === "https:") {
		    wsUri = "wss:";
		} else {
		    wsUri = "ws:";
		}
		wsUri += "//" + loc.host;
		wsUri += loc.pathname + "api";

		this.ws = new Websocket(wsUri)

		this.ws.addEventListener('open', () => {
			console.log('socket connected')
		})

		this.ws.addEventListener('close', () => {
			console.log('socket disconnected')
		})

		this.ws.addEventListener('message', (event) => {
			let data = event.data
			console.log('got message: ' + data)
			try {
				let json = JSON.parse(data)

				if (json.hasOwnProperty('action')) {
					let action = json.action;
					console.log('Got ' + action + ': ' + json)
				}
			}
			catch (e) {
				console.log('Got invalid JSON message')

			}
		})
	}
}

