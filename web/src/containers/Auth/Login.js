import React from 'react';
import { connect } from 'react-redux';

import * as authActions from 'store/actions/auth';
import Container from 'components/Container/Container';
import AlertDanger from 'components/Alert/AlertDanger';

export class Login extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  submitForm = event => {
    event.preventDefault();
    this.props.tryLogin(this.state.email, this.state.password);
  };

  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.setErrorMessage(null);
    }
  }

  render() {
    return (
      <Container small>
        <h1 className="mb-5">Login</h1>
        <form onSubmit={this.submitForm}>
          <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-3 col-form-label">
              Email address
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="email"
                placeholder="Enter email address"
                value={this.state.email}
                onChange={this.handleChange}
                required
                disabled={this.props.isLoading}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
              Password
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.handleChange}
                required
                minLength="6"
                disabled={this.props.isLoading}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={this.props.isLoading}
          >
            {this.props.isLoading ? 'Loading' : 'Login'}
          </button>
          <AlertDanger message={this.props.errorMessage} />
        </form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
  isLoading: state.auth.isLoading
});

const mapDispatchToProps = dispatch => ({
  tryLogin: (email, password) =>
    dispatch(authActions.tryLogin(email, password)),
  setErrorMessage: errorMessage =>
    dispatch(authActions.setErrorMessage(errorMessage))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
