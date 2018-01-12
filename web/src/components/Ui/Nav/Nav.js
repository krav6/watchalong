import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Search from './Search';

class Nav extends Component {
  state = {
    isMenuActive: false
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isMenuActive: !prevState.isMenuActive
    }));
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark app-menu">
        <div className="col-12 col-lg d-flex justify-content-between">
          <Link className="navbar-brand text-primary font-weight-bold" to="/">
            WatchAlong
          </Link>

          <button
            className="navbar-toggler ml-auto"
            type="button"
            data-toggle="collapse"
            aria-label="Toggle navigation"
            onClick={this.toggleMenu}
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>

        <div className="d-flex justify-content-center w-100">
          <Search />
        </div>

        <div
          className={
            this.state.isMenuActive
              ? 'navbar-collapse justify-content-end'
              : 'navbar-collapse justify-content-end collapse'
          }
        >
          <ul className="navbar-nav" onClick={this.toggleMenu}>
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies">
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tv-shows">
                TV&nbsp;Shows
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-secondary" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-primary" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
