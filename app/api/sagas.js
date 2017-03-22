import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import _ from 'lodash';
import store from 'store';
import { API_CONNECTED,
         API_REQUEST_LOGOUT, API_RESPONSE_LOGOUT_SUCCESSFUL, API_RESPONSE_LOGOUT_FAILED
       } from './actions';
import { request } from './socket';

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
  yield takeEvery(API_REQUEST_LOGOUT, logout);
  yield takeEvery(API_CONNECTED, authorize);
}

export default saga;
