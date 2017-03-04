import jsonpatch from 'fast-json-patch';
import { API_EVENT_STATE, API_EVENT_STATE_UPDATE } from './actions';

export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';
export const ADD_BREWERIES = 'ADD_BREWERIES';

const ACTION_HANDLERS = {
  [CONNECTED]: state => ({
    ...state,
    connected: true,
  }),
  [DISCONNECTED]: state => ({
    ...state,
    connected: false,
  }),
  [ADD_BREWERIES]: (state, action) => ({
    ...state,
    breweries: action.payload,
  }),
  [API_EVENT_STATE]: (state, action) => ({
    ...state,
    state: action.payload,
  }),
  [API_EVENT_STATE_UPDATE]: (state, action) => {
    const newState = JSON.parse(JSON.stringify(state.state));
    jsonpatch.apply(newState, action.payload);
    return {
      ...state,
      state: newState,
    };
  },
};

const initialState = {
  connected: false,
  state: {},
};

export function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
