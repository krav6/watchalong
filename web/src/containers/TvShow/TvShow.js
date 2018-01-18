import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Container from 'components/Container/Container';

class TvShow extends Component {
  render() {
    return (
      <Container>
        <h1>{this.props.title}</h1>
        <p>TvShow id: {this.props.match.params.id}</p>
        <Link to={'/chat/tv-show/' + this.props.match.params.id}>
          Go to chat
        </Link>
      </Container>
    );
  }
}

export default TvShow;
