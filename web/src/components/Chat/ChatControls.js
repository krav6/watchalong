import React from 'react';
import PropTypes from 'prop-types';

const chatControls = props => {
  return (
    <React.Fragment>
      <div className="d-flex">
        <button className="btn btn-primary mr-3" onClick={props.togglePlay}>
          {props.isPlaying ? 'Stop' : 'Play'}
        </button>
        <span className="align-self-center">{props.displayTime}</span>
      </div>
      <input
        type="range"
        className="w-100 my-3"
        name="time"
        value={props.time}
        min="0"
        max={props.videoLength}
        onChange={props.onFormChange}
      />
    </React.Fragment>
  );
};

chatControls.propTypes = {
  displayTime: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onFormChange: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  togglePlay: PropTypes.func.isRequired,
  videoLength: PropTypes.number.isRequired
};

export default chatControls;
