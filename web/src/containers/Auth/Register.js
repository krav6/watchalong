import React, { Component } from 'react';

import Main from 'components/Main/Main';

class Register extends Component {
  render() {
    return (
      <Main small>
        <h1 className="mb-5">Register</h1>
        <form>
          <div class="form-group row">
            <label for="inputEmail" class="col-sm-3 col-form-label">
              Email address
            </label>
            <div class="col-sm-9">
              <input
                type="email"
                class="form-control"
                id="inputEmail"
                placeholder="Enter email address"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-sm-3 col-form-label">
              Username
            </label>
            <div class="col-sm-9">
              <input
                type="text"
                class="form-control"
                id="inputName"
                placeholder="Enter username"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPassword" class="col-sm-3 col-form-label">
              Password
            </label>
            <div class="col-sm-9">
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                placeholder="Enter password"
              />
              <small class="form-text text-muted">
                Password must be at least 6 characters long.
              </small>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPasswordConf" class="col-sm-3 col-form-label">
              Confirm password
            </label>
            <div class="col-sm-9">
              <input
                type="password"
                class="form-control"
                id="inputPasswordConf"
                placeholder="Enter password again"
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-block">
            Register
          </button>
        </form>
      </Main>
    );
  }
}

export default Register;
