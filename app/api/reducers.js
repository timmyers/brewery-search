import jsonpatch from 'fast-json-patch';
import { API_EVENT_STATE, API_EVENT_STATE_UPDATE } from './actions';

export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';

const ACTION_HANDLERS = {
  [CONNECTED]: state => ({
    ...state,
    connected: true,
  }),
  [DISCONNECTED]: state => ({
    ...state,
    connected: false,
  }),
  [API_EVENT_STATE]: (state, action) => ({
    ...state,
    state: {
      ...state.state,
      [action.payload.key]: action.payload.state,
    },
  }),
  [API_EVENT_STATE_UPDATE]: (state, action) => {
    const newState = JSON.parse(JSON.stringify(state.state[action.payload.key]));
    console.log(newState, action.payload.state);
    jsonpatch.apply(newState, action.payload.state);
    return {
      ...state,
      state: {
        ...state.state,
        [action.payload.key]: newState,
      },
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
