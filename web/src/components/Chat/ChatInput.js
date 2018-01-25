import React from 'react';
import PropTypes from 'prop-types';

const chatControls = props => {
  return (
    <form className="input-group" onSubmit={props.onFormSubmit}>
      <input
        type="text"
        className="form-control bg-gray text-light border-none"
        placeholder="Enter message"
        name="inputMessage"
        value={props.inputMessage}
        onChange={props.onFormChange}
        required
      />
      <div className="input-group-append">
        <button className="btn btn-primary" type="submit">
          Send
        </button>
      </div>
    </form>
  );
};

chatControls.propTypes = {
  inputMessage: PropTypes.string.isRequired,
  onFormChange: PropTypes.func.isRequired
};

export default chatControls;
