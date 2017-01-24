import { PropTypes, Component } from 'react'
import Websocket from 'reconnecting-websocket'

export default class Socket extends Component {
	static propTypes = {
		connected: PropTypes.func.isRequired,
		addBreweries: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)

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
			this.props.connected(true)
		})

		this.ws.addEventListener('close', () => {
			console.log('socket disconnected')
			this.props.connected(false)
		})

		this.ws.addEventListener('message', (event) => {
			let data = event.data
			console.log('got message: ' + data)
			try {
				let json = JSON.parse(data)

				if (json.hasOwnProperty('action')) {
					let action = json.action;
					console.log('Got ' + action + ': ' + json)
					if (action == "breweries") {
						this.props.addBreweries(json.breweries)
					}
				}
			}
			catch (e) {
				console.log('Got invalid JSON message')

			}
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.lastRequestNum != this.props.lastRequestNum) {
			let action = nextProps.lastAction
			let params = nextProps.lastParams

			console.log('About to send: ' + action)
			let msg = {
				action,
				params
			}

			this.ws.send(JSON.stringify(msg))
		}
	}

	render() {
		return null
	}
}

