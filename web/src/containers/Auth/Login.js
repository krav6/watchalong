import React, { Component } from 'react';

import Main from 'components/Main/Main';

class Login extends Component {
  render() {
    return (
      <Main small>
        <h1 className="mb-5">Login</h1>
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
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-block">
            Login
          </button>
        </form>
      </Main>
    );
  }
}

export default Login;
