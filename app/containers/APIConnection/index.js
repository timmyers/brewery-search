import Socket from './Socket'
import { connect } from 'react-redux'

// ------------------------------------
// Constants
// ------------------------------------
export const CONNECTED = 'CONNECTED'
export const DISCONNECTED = 'DISCONNECTED'
export const ADD_BREWERIES = 'ADD_BREWERIES'
export const SEND_ACTION = 'SEND_ACTION'
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE'

// ------------------------------------
// Actions
// ------------------------------------
function connected(connected = true) {
  return {
    type : connected ? CONNECTED : DISCONNECTED,
  }
}

function addBreweries(breweries) {
	return {
		type: ADD_BREWERIES,
		payload: breweries
	}
}

const loginResponse = (result) => {
	return {
		type    : LOGIN_RESPONSE,
		payload : result
	}
}

function sendAction(action, params) {
	return {
		type: SEND_ACTION,
		payload: {
			action,
			params
		}
	}
}

const actions = {
  connected,
  addBreweries,
  loginResponse
}

const mapStateToProps = (state) => ({
  lastAction: state.api.lastAction,
  lastParams: state.api.lastParams,
  lastRequestNum: state.api.lastRequestNum
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONNECTED] : (state, action) => {
  	return Object.assign({}, state, {
    	connected: true
    })
  },
  [DISCONNECTED] : (state, action) => {
  	return Object.assign({}, state, {
    	connected: false
    })
  },
  [ADD_BREWERIES] : (state, action) => {
  	return Object.assign({}, state, {
    	breweries: action.payload
    })
  },
  [SEND_ACTION] : (state, action) => {
  	return Object.assign({}, state, {
    	lastAction: action.payload.action,
    	lastParams: action.payload.params,
    	lastRequestNum: state.lastRequestNum + 1
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	connected: false,
	breweries: [],
	lastAction: "",
	lastParams: {},
	lastRequestNum: 0
}

export function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default connect(mapStateToProps, actions)(Socket)
