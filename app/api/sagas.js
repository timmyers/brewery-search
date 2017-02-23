import { call, put, takeEvery } from 'redux-saga/effects'
import { API_REQUEST_LOGIN, API_RESPONSE_LOGIN_SUCCESSFUL, API_RESPONSE_LOGIN_FAILED } from './actions'
import { request } from './socket'

function* login(action) {
	try {
		let payload = action.payload;

		const loginResult = yield request('login', payload);
		console.log('login result: %s', JSON.stringify(loginResult))

		if (loginResult.result) {
		  yield put({type: API_RESPONSE_LOGIN_SUCCESSFUL});
		}
		else if (loginResult.error) {
		  yield put({type: API_RESPONSE_LOGIN_FAILED, error: loginResult.error});
		}

	} catch (e) {
		yield put({type: "LOGIN_FAILED", error: e});
	}
}

function* saga() {
  yield takeEvery(API_REQUEST_LOGIN, login);
}

export default saga;