import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Main from 'components/Main/Main';
import Nav from 'containers/Nav/Nav';
import Footer from 'components/Footer/Footer';
import Login from 'containers/Auth/Login';
import Register from 'containers/Auth/Register';

const app = () => (
  <div className="app">
    <Nav />
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route
        path="/"
        exact
        render={() => (
          <Main small>
            <h1>Main page</h1>
          </Main>
        )}
      />
      <Route
        render={() => (
          <Main small>
            <h1>Page not found</h1>
          </Main>
        )}
      />
    </Switch>
    <Footer />
  </div>
);

export default app;
