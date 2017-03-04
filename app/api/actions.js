// ------------------------------------
// Constants
// ------------------------------------
export const API_REQUEST_LOGIN = 'API_REQUEST_LOGIN';

export const API_RESPONSE_LOGIN_SUCCESSFUL = 'API_RESPONSE_LOGIN_SUCCESSFUL';
export const API_RESPONSE_LOGIN_FAILED = 'API_RESPONSE_LOGIN_FAILED';

export const API_EVENT_STATE = 'API_EVENT_STATE';
export const API_EVENT_STATE_UPDATE = 'API_EVENT_STATE_UPDATE';

export const login = (username, password) => ({
  type: API_REQUEST_LOGIN,
  payload: {
    username,
    password,
  },
});

export const setState = state => ({
  type: API_EVENT_STATE,
  payload: state,
});

export const updateState = updates => ({
  type: API_EVENT_STATE_UPDATE,
  payload: updates,
});
