import React from 'react';

const alert = props => {
  if (props.message) {
    return <div className="alert alert-danger my-3">{props.message}</div>;
  } else {
    return null;
  }
};

export default alert;
