import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Nav.css';
import Search from 'components/Nav/Search';
import NavItem from 'components/Nav/NavItem';

export class Nav extends React.Component {
  state = {
    isMenuShown: false
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isMenuShown: !prevState.isMenuShown
    }));
  };

  render() {
    const menuItems = [
      { text: 'Movies', to: '/movie' },
      { text: 'TV Shows', to: '/tv-show' }
    ];
    if (this.props.authenticated) {
      menuItems.push(
        { text: 'Profile', to: '/profile' },
        { text: 'Logout', to: '/logout', color: 'secondary' }
      );
    } else {
      menuItems.push(
        { text: 'Login', to: '/login', color: 'secondary' },
        { text: 'Register', to: '/register', color: 'primary' }
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
          <Search history={this.props.history} />
        </div>

        <div
          className={
            this.state.isMenuShown
              ? 'navbar-collapse justify-content-end'
              : 'navbar-collapse justify-content-end collapse'
          }
        >
          <ul className="navbar-nav" onClick={this.toggleMenu}>
            {menuItems.map((val, idx) => {
              return (
                <NavItem
                  text={val.text}
                  to={val.to}
                  color={val.color}
                  key={idx}
                />
              );
            })}
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
