import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/fontawesome-free-solid';

const chatControls = props => (
  <div className="d-flex">
    <button className="btn btn-primary mr-3" onClick={props.togglePlay}>
      {props.isPlaying ? (
        <FontAwesomeIcon icon={faPause} fixedWidth />
      ) : (
        <FontAwesomeIcon icon={faPlay} fixedWidth />
      )}
    </button>
    <p className="align-self-center mb-0 mr-3">{props.displayTime}</p>
    <input
      type="range"
      className="w-100 my-3 mr-3"
      name="time"
      value={props.time}
      min="0"
      max={props.videoLength}
      onChange={props.onFormChange}
    />
  </div>
);

chatControls.propTypes = {
  displayTime: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onFormChange: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  togglePlay: PropTypes.func.isRequired,
  videoLength: PropTypes.number.isRequired
};

export default chatControls;
