import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Container from 'components/Container/Container';
import Nav from 'containers/Nav/Nav';
import Footer from 'components/Footer/Footer';
import Login from 'containers/Auth/Login';
import Register from 'containers/Auth/Register';
import Home from 'containers/Home/Home';
import Movie from 'containers/Movie/Movie';
import TvShow from 'containers/TvShow/TvShow';
import Chat from 'containers/Chat/Chat';

const app = () => (
  <div className="app">
    <Nav />

    <section className="app-main">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/chat/:type/:id" component={Chat} />

        <Route path="/movie/:id" component={Movie} />

        <Route path="/tv-show/:id" component={TvShow} />

        <Route path="/" exact component={Home} />

        <Route
          render={() => (
            <Container small>
              <h1>Page not found</h1>
              <p>The requested page could not be found.</p>
            </Container>
          )}
        />
      </Switch>
    </section>

    <Footer />
  </div>
);

export default app;
