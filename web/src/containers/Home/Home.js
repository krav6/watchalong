import React, { Component } from 'react';

import Container from 'components/Container/Container';
import PosterList from 'components/Media/Poster/List';

class Home extends Component {
  render() {
    return (
      <Container>
        <h1>Home</h1>
        <PosterList
          name="Popular"
          items={[{ id: 0, title: 'Title 1' }]}
          link="popular"
          type="movie"
        />
        <PosterList
          name="List name with many elements"
          items={[
            { id: 0, title: 'Title 1' },
            { id: 1, title: 'Title 2 which has a long name' },
            { id: 2, title: 'Title 3' },
            { id: 3, title: 'Title 4' },
            { id: 4, title: 'Title 5' },
            { id: 5, title: 'Title 6' },
            { id: 6, title: 'Title 7' }
          ]}
          link="list"
          type="tv-show"
        />
        <PosterList name="Empty one" items={[]} link="list" type="movie" />
      </Container>
    );
  }
}

export default Home;
