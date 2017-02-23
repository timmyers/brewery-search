// ------------------------------------
// Constants
// ------------------------------------
export const MAP_BOUNDS_CHANGED = 'MAP_BOUNDS_CHANGED'

export const mapBoundsChanged = (bounds) => {
	return {
		type    : MAP_BOUNDS_CHANGED,
    payload : bounds 
	}
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MAP_BOUNDS_CHANGED] : (state, action) => {
  	return {
      bounds: action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	bounds: {}
}

export function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}