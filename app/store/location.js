import {history} from 'app';

// ------------------------------------
// Constants
// ------------------------------------
export const NAVIGATE = 'NAVIGATE';

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange (location = '/') {
  return {
    type    : NAVIGATE,
    payload : location
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  location: history.location,
  action: history.action
}

export default function locationReducer (state = initialState, action) {
	if (action.type === NAVIGATE) {
    return {
      location: action.location,
      action: action.action
    }
  } else {
    return state
  }
}
