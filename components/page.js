/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';

import businessActions from '../redux/actions/actions';

function Page({ token, login }) {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div>
      <h1>{token}</h1>
      <Button variant="contained" color="secondary" onClick={login}>Login</Button>
    </div>
  );
}

const selectAuth = state => state.get('auth');

const makeWelcomeSelector = () => createSelector(
  selectAuth,
  state => state.get('auth_token'),
);

const mapStateToProps = createStructuredSelector({
  token: makeWelcomeSelector(),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    login: businessActions.loginRequest,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Page);
