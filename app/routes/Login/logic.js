import { push } from 'connected-react-router';
import { API_RESPONSE_LOGIN_FAILED } from 'api/actions';

export const USERNAME_INPUT_CHANGED = 'USERNAME_INPUT_CHANGED';
export const USERNAME_FOCUSED = 'USERNAME_FOCUSED';
export const PASSWORD_INPUT_CHANGED = 'PASSWORD_INPUT_CHANGED';
export const PASSWORD_FOCUSED = 'PASSWORD_FOCUSED';

export const usernameChanged = username => ({
  type: USERNAME_INPUT_CHANGED,
  payload: username,
});

export const usernameFocused = () => ({
  type: USERNAME_FOCUSED,
});

export const passwordChanged = password => ({
  type: PASSWORD_INPUT_CHANGED,
  payload: password,
});

export const passwordFocused = () => ({
  type: PASSWORD_FOCUSED,
});

export const register = () => (dispatch) => {
  dispatch(push('/register'));
};

const ACTION_HANDLERS = {
  [USERNAME_INPUT_CHANGED]: (state, action) => {
    const username = action.payload;
    let usernameError = '';

    if (username.length === 0) {
      usernameError = 'Username may not be empty';
    }

    return {
      ...state,
      username,
      usernameError,
    };
  },
  [USERNAME_FOCUSED]: state => ({
    ...state,
    usernameTouched: true,
  }),
  [PASSWORD_INPUT_CHANGED]: (state, action) => {
    const password = action.payload;
    let passwordError = '';
    if (password.length === 0) {
      passwordError = 'Password may not be empty';
    }
    return {
      ...state,
      password,
      passwordError,
    };
  },
  [PASSWORD_FOCUSED]: state => ({
    ...state,
    passwordTouched: true,
  }),
  [API_RESPONSE_LOGIN_FAILED]: (state, action) => {
    const error = action.error;
    if (error.username) {
      return {
        ...state,
        usernameError: error.username,
        passwordError: '',
      };
    } else if (error.password) {
      return {
        ...state,
        usernameError: '',
        passwordError: error.password,
      };
    }

    return state;
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  username: '',
  usernameError: 'Username may not be empty',
  usernameTouched: false,
  password: '',
  passwordError: 'Password may not be empty',
  passwordTouched: false,
};

export function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
