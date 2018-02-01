import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';

import './Search.css';

class Search extends React.Component {
  state = {
    title: '',
    type: 'all'
  };

  onChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.history.push(
      `/search/${this.state.type}/${encodeURIComponent(this.state.title)}`
    );
    this.setState({
      ...this.state,
      title: '',
      type: 'all'
    });
  };

  render() {
    return (
      <form className="form-inline my-2 my-lg-0 w-100" onSubmit={this.onSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control w-25 search-bg text-light border-none"
            placeholder="Search for..."
            name="title"
            value={this.state.title}
            onChange={this.onChange}
            required
          />
          <select
            className="custom-select search-bg text-light border-none"
            name="type"
            value={this.state.type}
            onChange={this.onChange}
          >
            <option value="all">All</option>
            <option value="movie">Movies</option>
            <option value="tv-show">TV Shows</option>
          </select>
          <div className="input-group-append">
            <button className="btn btn-link" type="submit">
              <FontAwesomeIcon icon={faSearch} fixedWidth />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Search;
