import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/fontawesome-free-solid';

import Container from 'components/Container/Container';
import Poster from 'components/Media/Poster/Poster';

class Movie extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="fanart-container">
          <div
            className="fanart"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url('/poster.jpg')"
            }}
          />
        </div>
        <Container>
          <div className="d-flex mb-3">
            <div className="mr-5">
              <Poster id={2} title="Title" type="movie" noText />
            </div>
            <div>
              <h1 className="text-primary">
                Movie title (id: {this.props.match.params.id})
              </h1>
              <p className="text-info">
                <FontAwesomeIcon icon={faCalendar} fixedWidth />2018/01/29{' '}
                <FontAwesomeIcon icon={faClock} fixedWidth />112 mins
              </p>
              <p className="text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum ducimus repudiandae nam perferendis ipsum fugit
                necessitatibus officiis suscipit, placeat magnam assumenda
                molestias adipisci amet ad atque animi, consectetur, quaerat
                cum!
              </p>

              <hr className="my-4" />

              <Link to={'/chat/movie/' + this.props.match.params.id}>
                <button className="btn btn-block btn-lg btn-primary">
                  Go to chat
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Movie;
