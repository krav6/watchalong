import React from 'react';

import Container from 'components/Container/Container';
import PosterList from 'components/Media/Poster/List';

class Home extends React.Component {
  render() {
    return (
      <Container>
        <h1>Home</h1>
        <PosterList
          name="Popular"
          items={[{ id: 0, title: 'Title 1', type: 'movie' }]}
          link="popular"
          oneLine
        />
        <PosterList
          name="List name with many elements"
          items={[
            { id: 0, title: 'Title 1', type: 'movie' },
            { id: 1, title: 'Title 2 which has a long name', type: 'tv show' },
            { id: 2, title: 'Title 3', type: 'movie' },
            { id: 3, title: 'Title 4', type: 'tv show' },
            { id: 4, title: 'Title 5', type: 'movie' },
            { id: 5, title: 'Title 6', type: 'movie' },
            { id: 6, title: 'Title 7', type: 'movie' }
          ]}
          link="list"
          oneLine
        />
        <PosterList name="Empty one" items={[]} link="list" type="movie" />
      </Container>
    );
  }
}

export default Home;
