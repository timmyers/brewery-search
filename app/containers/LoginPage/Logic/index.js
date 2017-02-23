import { API_RESPONSE_LOGIN_SUCCESSFUL, API_RESPONSE_LOGIN_FAILED } from 'api/actions'
// ------------------------------------
// Constants
// ------------------------------------
export const USERNAME_INPUT_CHANGED = 'USERNAME_INPUT_CHANGED'
export const USERNAME_FOCUSED = 'USERNAME_FOCUSED'
export const PASSWORD_INPUT_CHANGED = 'PASSWORD_INPUT_CHANGED'
export const PASSWORD_FOCUSED = 'PASSWORD_FOCUSED'

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

export const passwordChanged = (password) => {
	return {
		type    : PASSWORD_INPUT_CHANGED,
    payload : password 
	}
}

export const passwordFocused = () => {
	return {
		type : PASSWORD_FOCUSED
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
  	return Object.assign({}, state, {
  		username,
  		usernameError
    })
  },
  [USERNAME_FOCUSED] : (state, action) => {
  	return Object.assign({}, state, {
  		usernameTouched: true
  	})
  },
  [PASSWORD_INPUT_CHANGED] : (state, action) => {
  	let password = action.payload
  	let passwordError = ""
  	if (password.length == 0) {
  		passwordError = "Password may not be empty"
  	}
  	return Object.assign({}, state, {
  		password,
  		passwordError
    })
  },
  [PASSWORD_FOCUSED] : (state, action) => {
  	return Object.assign({}, state, {
  		passwordTouched: true
  	})
  },
  [API_RESPONSE_LOGIN_FAILED] : (state, action) => {
  	let error = action.error;
  	if (error.username) {
			return Object.assign({}, state, {
	  		usernameError: error.username
	  	})
		}
		else if (error.password) {
			return Object.assign({}, state, {
	  		passwordError: error.password
	  	})
		}
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	username: "",
	usernameError: "Username may not be empty",
	usernameTouched: false,
	password: "",
	passwordError: "Password may not be empty",
	passwordTouched: false
}

export function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}