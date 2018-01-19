import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from 'store/actions/auth';

export class Logout extends React.Component {
  componentDidMount() {
    this.props.setToken(null);
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(authActions.setToken(null))
});

export default connect(null, mapDispatchToProps)(Logout);
