import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import './App.css';
import * as authActions from 'store/actions/auth';
import PrivateRoute from 'components/Routes/PrivateRoute';
import Container from 'components/Container/Container';
import Nav from 'containers/Nav/Nav';
import Footer from 'components/Footer/Footer';
import Login from 'containers/Auth/Login';
import Register from 'containers/Auth/Register';
import Logout from 'containers/Auth/Logout';
import Home from 'containers/Home/Home';
import Movie from 'containers/Movie/Movie';
import TvShow from 'containers/TvShow/TvShow';
import Chat from 'containers/Chat/Chat';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.autoLogin();
  }

  autoLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const jwtPayload = jwtDecode(token);
      const now = Math.round(Date.now() / 1000);
      if (jwtPayload.exp > now) {
        this.props.setToken(token);
      } else {
        this.props.setToken(null);
      }
    }
  };

  render() {
    return (
      <div className="app">
        <Nav />

        <section className="app-main">
          <Switch>
            <PrivateRoute
              path="/login"
              component={Login}
              condition={!this.props.authenticated}
              redirectTo="/"
            />
            <PrivateRoute
              path="/register"
              component={Register}
              condition={!this.props.authenticated}
              redirectTo="/"
            />
            <PrivateRoute
              path="/logout"
              component={Logout}
              condition={this.props.authenticated}
              redirectTo="/"
            />

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
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(authActions.setToken(token))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
