import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './Nav.css';
import Search from 'components/Nav/Search';

class Nav extends React.Component {
  state = {
    isMenuActive: false
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isMenuActive: !prevState.isMenuActive
    }));
  };

  render() {
    const menuItems = [
      <li className="nav-item" key="0">
        <NavLink className="nav-link" to="/movie">
          Movies
        </NavLink>
      </li>,
      <li className="nav-item" key="1">
        <NavLink className="nav-link" to="/tv-show">
          TV Shows
        </NavLink>
      </li>
    ];
    if (this.props.authenticated) {
      menuItems.push(
        <li className="nav-item" key="2">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>,
        <li className="nav-item" key="3">
          <NavLink className="nav-link text-secondary" to="/logout">
            Logout
          </NavLink>
        </li>
      );
    } else {
      menuItems.push(
        <li className="nav-item" key="2">
          <NavLink className="nav-link text-secondary" to="/login">
            Login
          </NavLink>
        </li>,
        <li className="nav-item" key="3">
          <NavLink className="nav-link text-primary" to="/register">
            Register
          </NavLink>
        </li>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark app-menu shadow-lg">
        <Link
          className="navbar-brand text-primary font-weight-bold mr-5"
          to="/"
        >
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

        <div className="navbar-search mx-auto">
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
            {menuItems}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Nav);
