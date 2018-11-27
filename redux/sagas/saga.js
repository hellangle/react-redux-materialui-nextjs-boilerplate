import {
  fork, put, takeLatest,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';

import { LOGIN_REQUEST, SET_AUTH } from '../actions/actions';

es6promise.polyfill();

function* login(action) {
  yield put({
    type: SET_AUTH,
  });
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

export default function* rootSaga() {
  yield fork(watchLogin);
}
