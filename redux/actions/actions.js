
import { createActions } from 'redux-actions';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const SET_AUTH = 'SET_AUTH';

const businessActions = createActions({}, ...Object.values({
  LOGIN_REQUEST, SET_AUTH,
}));

export default { ...businessActions };
