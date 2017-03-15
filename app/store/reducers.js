import { combineReducers } from 'redux';

import { reducer as apiReducer } from 'api';
import { reducer as loginReducer } from 'routes/Login';
import { reducer as mapReducer } from 'routes/Home';

const makeRootReducer = asyncReducers => (
  combineReducers({
    api: apiReducer,
    login: loginReducer,
    map: mapReducer,
    ...asyncReducers,
  })
);

export default makeRootReducer;
