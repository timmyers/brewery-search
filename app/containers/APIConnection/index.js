import Socket from './Socket'
import { connect } from 'react-redux'

// ------------------------------------
// Constants
// ------------------------------------
export const CONNECTED = 'CONNECTED'
export const DISCONNECTED = 'DISCONNECTED'
export const ADD_BREWERIES = 'ADD_BREWERIES'

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

const actions = {
  connected,
  addBreweries
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONNECTED] : (state, action) => {
  	state.connected = true
  	return state
  },
  [DISCONNECTED] : (state, action) => {
  	state.connected = false
  	return state
  },
  [ADD_BREWERIES] : (state, action) => {
  	state.breweries = action.payload
  	return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	connected: false
}

export function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default connect(null, actions)(Socket)
