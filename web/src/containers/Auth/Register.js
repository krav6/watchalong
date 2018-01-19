import React from 'react';
import { connect } from 'react-redux';

import * as authActions from 'store/actions/auth';
import Container from 'components/Container/Container';
import AlertDanger from 'components/Alert/AlertDanger';

export class Register extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
    passwordConfirm: ''
  };

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  submitForm = event => {
    event.preventDefault();
    if (this.state.password !== this.state.passwordConfirm) {
      this.props.setErrorMessage('Passwords do not match.');
      return;
    }
    this.props.tryRegister(
      this.state.email,
      this.state.username,
      this.state.password
    );
  };

  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.setErrorMessage(null);
    }
  }

  render() {
    return (
      <Container small>
        <h1 className="mb-5">Register</h1>
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
                placeholder="Enter email address"
                name="email"
                required
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-3 col-form-label">
              Username
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Enter username"
                name="username"
                required
                minLength="4"
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">
                Username must be at least 4 characters long.
              </small>
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
                placeholder="Enter password"
                name="password"
                required
                minLength="6"
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">
                Password must be at least 6 characters long.
              </small>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputPasswordConf"
              className="col-sm-3 col-form-label"
            >
              Confirm password
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="inputPasswordConf"
                placeholder="Enter password again"
                name="passwordConfirm"
                required
                minLength="6"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
          <AlertDanger message={this.props.errorMessage} />
        </form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage
});

const mapDispatchToProps = dispatch => ({
  tryRegister: (email, username, password) =>
    dispatch(authActions.tryRegister(email, username, password)),
  setErrorMessage: errorMessage =>
    dispatch(authActions.setErrorMessage(errorMessage))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
