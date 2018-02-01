import React from 'react';

import Container from 'components/Container/Container';
import PosterList from 'components/Media/Poster/List';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.getDataFromUrl(props)
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...this.state,
      ...this.getDataFromUrl(props)
    });
  }

  getDataFromUrl = props => {
    let type;
    switch (props.match.params.type) {
      case 'movie':
        type = 1;
        break;

      case 'tv-show':
        type = 2;
        break;

      case 'all':
      default:
        type = 0;
        break;
    }

    return {
      title: decodeURIComponent(props.match.params.title),
      type
    };
  };

  getTypeText = () => {
    switch (this.state.type) {
      case 1:
        return 'Movies';
      case 2:
        return 'TV Shows';
      default:
        return 'Movies & TV Shows';
    }
  };

  render() {
    return (
      <Container>
        <h1>
          Search results for{' '}
          <span className="text-primary">{this.state.title}</span>
        </h1>
        <h3 className="text-secondary">{this.getTypeText()}</h3>

        <PosterList items={[{ id: 0, title: 'Title 1', type: 'movie' }]} />
      </Container>
    );
  }
}

export default Search;
