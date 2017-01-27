import { combineReducers } from 'redux'
import locationReducer from './location'
import { reducer as apiReducer } from 'containers/APIConnection'
import { reducer as loginReducer } from 'containers/LoginPage'
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    router: locationReducer,
    api: apiReducer,
    login: loginReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
