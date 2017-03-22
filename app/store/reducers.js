import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as apiReducer } from 'api';
import { reducer as mapReducer } from 'routes/Home';

const makeRootReducer = asyncReducers => (
  combineReducers({
    form: formReducer,
    api: apiReducer,
    map: mapReducer,
    ...asyncReducers,
  })
);

export default makeRootReducer;
