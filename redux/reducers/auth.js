import Immutable from 'immutable';

import { SET_AUTH } from '../actions/actions';

export const AUTH_STORE = 'auth';
export const TOKEN = 'auth_token';
export const LOGIN_REQUEST_RESULT = 'loginRequestResult';

const authReducer = (state = Immutable.Map({}), action) => {
  switch (action.type) {
  case SET_AUTH:
    return state.set(TOKEN, 'authorized_token');
  default:
    return state;
  }
};

export default authReducer;
