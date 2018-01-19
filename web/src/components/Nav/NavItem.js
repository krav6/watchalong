import React from 'react';
import { NavLink } from 'react-router-dom';

const navItem = props => {
  const classes = props.color
    ? ['nav-link', 'text-' + props.color]
    : ['nav-link'];
  return (
    <li className="nav-item">
      <NavLink className={classes.join(' ')} to={props.to}>
        {props.text}
      </NavLink>
    </li>
  );
};

export default navItem;
