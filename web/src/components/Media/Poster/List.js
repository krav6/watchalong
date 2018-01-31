import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/fontawesome-free-solid';

import Poster from './Poster';

const list = props => {
  let list = null;
  let expand = null;

  if (props.items.length > 0) {
    const posters = props.items.map(item => {
      return (
        <div className="col-4 col-md-3 col-xl-2" key={item.id}>
          <Link to={props.type + '/' + item.id}>
            <Poster id={item.id} title={item.title} type={props.type} />
          </Link>
        </div>
      );
    });

    list = <div className="row flex-nowrap hide-x">{posters}</div>;

    expand = (
      <Link
        to={props.link ? props.link : '#'}
        className="btn text-secondary btn-lg"
      >
        More<FontAwesomeIcon icon={faChevronRight} fixedWidth />
      </Link>
    );
  } else {
    list = (
      <div className="alert alert-dark text-center">No entries found.</div>
    );
  }

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between">
        <h2 className="mb-3">{props.name}</h2>
        {expand}
      </div>
      {list}
    </div>
  );
};

list.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  link: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default list;
