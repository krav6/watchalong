import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <div>
        <h2 className="bg-primary p-3">
          {this.props.match.params.type} id: {this.props.match.params.id}
        </h2>
      </div>
    );
  }
}

export default Movie;
