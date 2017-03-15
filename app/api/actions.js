export const API_CONNECTED = 'API_CONNECTED';
export const API_DISCONNECTED = 'API_DISCONNECTED';

export const API_REQUEST_LOGIN = 'API_REQUEST_LOGIN';
export const API_RESPONSE_LOGIN_SUCCESSFUL = 'API_RESPONSE_LOGIN_SUCCESSFUL';
export const API_RESPONSE_LOGIN_FAILED = 'API_RESPONSE_LOGIN_FAILED';

export const API_REQUEST_LOGOUT = 'API_REQUEST_LOGOUT';
export const API_RESPONSE_LOGOUT_SUCCESSFUL = 'API_RESPONSE_LOGOUT_SUCCESSFUL';
export const API_RESPONSE_LOGOUT_FAILED = 'API_RESPONSE_LOGOUT_FAILED';

export const API_EVENT_STATE = 'API_EVENT_STATE';
export const API_EVENT_STATE_UPDATE = 'API_EVENT_STATE_UPDATE';

export const connected = () => ({ type: API_CONNECTED });
export const disconnected = () => ({ type: API_DISCONNECTED });

export const login = (username, password) => ({
  type: API_REQUEST_LOGIN,
  payload: {
    username,
    password,
  },
});

export const logout = () => ({
  type: API_REQUEST_LOGOUT,
});

export const setState = state => ({
  type: API_EVENT_STATE,
  payload: state,
});

export const updateState = updates => ({
  type: API_EVENT_STATE_UPDATE,
  payload: updates,
});
