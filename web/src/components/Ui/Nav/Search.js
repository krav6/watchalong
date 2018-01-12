import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';

const search = () => (
  <form className="form-inline my-2 my-lg-0">
    <div className="input-group">
      <input
        type="text"
        className="form-control w-25 bg-dark text-light"
        placeholder="Search for..."
      />
      <select className="custom-select bg-dark text-light" defaultValue="0">
        <option value="0">All</option>
        <option value="1">Movies</option>
        <option value="2">TV Shows</option>
      </select>
      <div className="input-group-append">
        <button className="btn btn-primary" type="button">
          <FontAwesomeIcon icon={faSearch} fixedWidth />
        </button>
      </div>
    </div>
  </form>
);

export default search;