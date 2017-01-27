import { SEND_ACTION } from 'containers/APIConnection'

// ------------------------------------
// Constants
// ------------------------------------
export const USERNAME_INPUT_CHANGED = 'USERNAME_INPUT_CHANGED'
export const USERNAME_FOCUSED = 'USERNAME_FOCUSED'


export const login = (username, password) => {
	return {
    type    : SEND_ACTION,
    payload : {
    	action: 'login',
    	params: {
    		username,
    		password
    	}
    }
  }
}

export const usernameChanged = (username) => {
	return {
		type    : USERNAME_INPUT_CHANGED,
    payload : username 
	}
}

export const usernameFocused = () => {
	return {
		type : USERNAME_FOCUSED
	}
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USERNAME_INPUT_CHANGED] : (state, action) => {
  	let username = action.payload
  	let usernameError = ""
  	if (username.length == 0) {
  		usernameError = "Username may not be empty"
  	}
  	else if (username.length < 6) {
  		usernameError = "Username must be at least 6 characters"
  	}

  	return Object.assign({}, state, {
  		usernameError
    })
  },
  [USERNAME_FOCUSED] : (state, action) => {
  	return Object.assign({}, state, {
  		usernameTouched: true
  	})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	usernameError: "Username may not be empty",
	usernameTouched: false
}

export function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}