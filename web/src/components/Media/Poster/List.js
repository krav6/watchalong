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
          <Link to={'/' + item.type + '/' + item.id}>
            <Poster id={item.id} title={item.title} type={item.type} />
          </Link>
        </div>
      );
    });

    if (props.oneLine) {
      list = <div className="row flex-nowrap hide-x">{posters}</div>;
    } else {
      list = <div className="row">{posters}</div>;
    }

    if (props.link) {
      expand = (
        <Link
          to={'/' + props.link ? props.link : '#'}
          className="btn text-secondary btn-lg"
        >
          More<FontAwesomeIcon icon={faChevronRight} fixedWidth />
        </Link>
      );
    }
  } else {
    list = (
      <div className="alert alert-dark text-center">No entries found.</div>
    );
  }

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between">
        {props.name && <h2 className="mb-3">{props.name}</h2>}
        {expand}
      </div>
      {list}
    </div>
  );
};

list.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array.isRequired,
  link: PropTypes.string,
  oneLine: PropTypes.bool
};

export default list;
