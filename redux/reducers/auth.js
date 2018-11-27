import Immutable from 'immutable';

export const AUTH_STORE = 'auth';
export const TOKEN = 'auth_token';
export const LOGIN_REQUEST_RESULT = 'loginRequestResult';

const authReducer = (state = Immutable.Map({}), action) => {
  switch (action.type) {
  case 'loginRequest':
    return state.set('welcome', `Welcome Nextjs`);
  case 'setAuth':
    return state.set(TOKEN, 'authorized_token');
  default:
    return state;
  }
};

export default authReducer;
