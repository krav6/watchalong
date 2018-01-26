import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Poster.css';

const poster = props => (
  <Link to={props.type + '/' + props.id}>
    <div className="poster bg-dark shadow-sm">
      <img src="poster.jpg" alt={props.title} className="poster-img" />
      <div className="poster-text text-white">{props.title}</div>
    </div>
  </Link>
);

poster.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default poster;
