import { combineReducers } from 'redux'
import locationReducer from './location'
import { reducer as apiReducer } from 'api'
import { reducer as loginReducer } from 'containers/LoginPage'
import { reducer as mapReducer } from 'containers/HomePage'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    router: locationReducer,
    api: apiReducer,
    login: loginReducer,
    map: mapReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
