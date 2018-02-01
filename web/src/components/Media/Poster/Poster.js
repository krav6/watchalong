import React from 'react';
import PropTypes from 'prop-types';

import './Poster.css';

const poster = props => {
  const postClasses = ['poster', 'bg-dark', 'shadow-sm', 'mb-3'];
  if (props.type === 'episode') {
    postClasses.push('poster-episode');
  } else {
    postClasses.push('poster-cover');
  }
  return (
    <div className={postClasses.join(' ')}>
      <img src="/poster.jpg" alt={props.title} className="poster-img" />
      {!props.noText && (
        <div className="poster-text text-white">{props.title}</div>
      )}
    </div>
  );
};

poster.propTypes = {
  id: PropTypes.number.isRequired,
  noText: PropTypes.bool,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default poster;
