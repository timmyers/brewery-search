import jsonpatch from 'fast-json-patch'
import {API_EVENT_STATE, API_EVENT_STATE_UPDATE} from './actions'

// ------------------------------------
// Constants
// ------------------------------------
export const CONNECTED = 'CONNECTED'
export const DISCONNECTED = 'DISCONNECTED'
export const ADD_BREWERIES = 'ADD_BREWERIES'

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
  [API_EVENT_STATE] : (state, action) => {
    return {
      ...state,
      state: action.payload
    }
  },
  [API_EVENT_STATE_UPDATE] : (state, action) => {
    let newState = JSON.parse(JSON.stringify(state.state));
    jsonpatch.apply(newState, action.payload);
    return {
      ...state,
      state: newState
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	connected: false,
	state: {}
}

export function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}