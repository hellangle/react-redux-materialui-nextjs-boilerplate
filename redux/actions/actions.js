
import { createActions } from 'redux-actions';

export const LOGIN_REQUEST = 'loginRequest';
export const SET_AUTH = 'setAuth';

const businessActions = createActions({}, ...Object.values({
  LOGIN_REQUEST, SET_AUTH,
}));

export default { ...businessActions };
