import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Main from './components/Ui/Main/Main';
import Nav from './components/Ui/Nav/Nav';
import Footer from './components/Ui/Footer/Footer';

const app = () => (
  <div className="app">
    <Nav />
    <Switch>
      <Route
        path="/"
        exact
        render={() => (
          <Main>
            <h1>Main page</h1>
          </Main>
        )}
      />
      <Route
        render={() => (
          <Main>
            <h1>Page not found</h1>
          </Main>
        )}
      />
    </Switch>
    <Footer />
  </div>
);

export default app;
