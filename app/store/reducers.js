import { combineReducers } from 'redux';

import { reducer as apiReducer } from 'api';
import { reducer as loginReducer } from 'containers/LoginPage';
import { reducer as mapReducer } from 'containers/HomePage';
import locationReducer from './location';

const makeRootReducer = asyncReducers => (
  combineReducers({
    router: locationReducer,
    api: apiReducer,
    login: loginReducer,
    map: mapReducer,
    ...asyncReducers,
  })
);

export default makeRootReducer;
