import Socket from './Socket'
import { connect } from 'react-redux'

// ------------------------------------
// Constants
// ------------------------------------
export const CONNECTED = 'CONNECTED'
export const DISCONNECTED = 'DISCONNECTED'

// ------------------------------------
// Actions
// ------------------------------------
function connected(connected = true) {
  return {
    type : connected ? CONNECTED : DISCONNECTED,
  }
}

const actions = {
  connected
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
