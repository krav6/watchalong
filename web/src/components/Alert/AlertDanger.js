import React from 'react';

const alert = props =>
  props.message && (
    <div className="alert alert-danger my-3">{props.message}</div>
  );

export default alert;
