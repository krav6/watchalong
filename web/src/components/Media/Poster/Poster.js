import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Poster.css';

const poster = props => {
  return (
    <Link to={props.title + '/' + props.id}>
      <div
        className="poster bg-dark shadow-sm"
        style={{ backgroundImage: 'url(#)' }}
      >
        <div className="poster-text text-white">{props.title}</div>
      </div>
    </Link>
  );
};

poster.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default poster;
