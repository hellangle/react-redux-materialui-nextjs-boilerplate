import {
  fork, put, takeLatest,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';

es6promise.polyfill();

function* login(action) {
  console.log('action -> ', action);
  yield put({
    type: 'setAuth',
  });
}

function* watchLogin() {
  yield takeLatest('LOGIN_REQUEST', login);
}

export default function* rootSaga() {
  yield fork(watchLogin);
}
