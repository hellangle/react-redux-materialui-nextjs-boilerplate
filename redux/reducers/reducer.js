import { combineReducers } from 'redux-immutable';
import authReducer, { AUTH_STORE } from './auth';

const makeRootReducer = (asyncReducers) => {
  const reducers = {
    ...asyncReducers,
  };

  reducers[AUTH_STORE] = authReducer;

  return combineReducers(reducers);
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  const _store = store;
  _store.asyncReducers[key] = reducer;
  _store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
