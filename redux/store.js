import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'immutable';
import rootSaga from './sagas/saga';
import makeRootReducer from './reducers/reducer';

const dev = (process.env.NODE_ENV === 'development');
const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

const convertStateToImmutable = (state) => {
  if (state.toJS) return state;
  let immutableState = Immutable.Map({});
  Object.entries(state).forEach(([key, value]) => {
    immutableState = immutableState.set(key, Immutable.Map(value));
  });
  return immutableState;
};

const configureStore = (state = Immutable.Map({})) => {
  const sagaMiddleware = createSagaMiddleware();
  let middlewares = [
    sagaMiddleware,
  ];
  if (dev && process.browser) {
    const { createLogger } = require('redux-logger');
    middlewares = [...middlewares, createLogger()];
  }

  const store = createStore(
    makeRootReducer(),
    convertStateToImmutable(state),
    dev ? composeWithDevTools(applyMiddleware(...middlewares))
      : compose(applyMiddleware(...middlewares)),
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();

  return store;
};

const getOrCreateStore = (initialState = Immutable.Map({})) => {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return configureStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = configureStore(initialState);
  }

  return window[__NEXT_REDUX_STORE__];
};

export default App => class AppWithRedux extends React.Component {
  static async getInitialProps(appContext) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const reduxStore = getOrCreateStore();

    // Provide the store to getInitialProps of pages
    // eslint-disable-next-line no-param-reassign
    appContext.ctx.reduxStore = reduxStore;

    let appProps = {};
    if (typeof App.getInitialProps === 'function') {
      appProps = await App.getInitialProps(appContext);
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    };
  }

  constructor(props) {
    super(props);
    this.reduxStore = getOrCreateStore(props.initialReduxState);
  }

  render() {
    return <App {...this.props} reduxStore={this.reduxStore} isServer={isServer} />;
  }
};
