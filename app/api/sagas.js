import { put, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';
import store from 'store';
import { API_CONNECTED, API_REQUEST_LOGIN, API_RESPONSE_LOGIN_SUCCESSFUL, API_RESPONSE_LOGIN_FAILED } from './actions';
import { request } from './socket';

function* login(action) {
  try {
    const payload = action.payload;

    const loginResult = yield request('login', payload);
    console.log('login result: %s', JSON.stringify(loginResult));

    if (_.has(loginResult, 'result')) {
      if (_.has(loginResult.result, 'token')) {
        const token = loginResult.result.token;
        console.log('received login token: ', token);
        store.set('loginToken', token);
      }
      yield put({ type: API_RESPONSE_LOGIN_SUCCESSFUL });
    } else if (loginResult.error) {
      yield put({ type: API_RESPONSE_LOGIN_FAILED, error: loginResult.error });
    }
  } catch (e) {
    yield put({ type: 'LOGIN_FAILED', error: e });
  }
}

function* authorize() {
  try {
    const loginToken = store.get('loginToken');
    if (loginToken) {
      const authInfo = { token: loginToken };
      const authorizeResult = yield request('authorize', authInfo);
      console.log('authorize successful: ', authorizeResult);
    }
  } catch (e) {
    // Ignore
  }
}

function* saga() {
  yield takeEvery(API_REQUEST_LOGIN, login);
  yield takeEvery(API_CONNECTED, authorize);
}

export default saga;
