import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import _ from 'lodash';
import store from 'store';
import { API_CONNECTED,
         API_REQUEST_LOGIN, API_RESPONSE_LOGIN_SUCCESSFUL, API_RESPONSE_LOGIN_FAILED,
         API_REQUEST_LOGOUT, API_RESPONSE_LOGOUT_SUCCESSFUL, API_RESPONSE_LOGOUT_FAILED
       } from './actions';
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
      yield put(push('/'));
    } else if (loginResult.error) {
      yield put({ type: API_RESPONSE_LOGIN_FAILED, error: loginResult.error });
    }
  } catch (e) {
    yield put({ type: 'LOGIN_FAILED', error: e });
  }
}

function* logout() {
  try {
    const logoutResult = yield request('logout', {});
    console.log('logout result: %s', JSON.stringify(logoutResult));

    if (_.has(logoutResult, 'result')) {
      console.log('deleting login token: ');
      store.remove('loginToken');
      yield put({ type: API_RESPONSE_LOGOUT_SUCCESSFUL });
      yield put(push('/login'));
    } else if (_.has(logoutResult, 'error')) {
      yield put({ type: API_RESPONSE_LOGOUT_FAILED });
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
      if (_.has(authorizeResult, 'error')) {
        console.log('authorize failed: ', authorizeResult.error);
        store.remove('loginToken');
      } else {
        console.log('authorize successful: ', authorizeResult);
      }
    }
  } catch (e) {
    // Ignore
  }
}

function* saga() {
  yield takeEvery(API_REQUEST_LOGIN, login);
  yield takeEvery(API_REQUEST_LOGOUT, logout);
  yield takeEvery(API_CONNECTED, authorize);
}

export default saga;
