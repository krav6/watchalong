import React from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

const privateRoute = ({
  path,
  component: Component,
  condition,
  redirectTo,
  ...rest
}) =>
  condition ? (
    <Route path={path} component={Component} {...rest} />
  ) : (
    <Redirect to={{ pathname: redirectTo, state: { from: rest.location } }} />
  );

privateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  condition: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired
};

export default privateRoute;
