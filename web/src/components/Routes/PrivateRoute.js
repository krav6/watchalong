import React from 'react';

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

export default privateRoute;
