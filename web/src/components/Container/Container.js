import React from 'react';

const container = props => {
  if (props.small) {
    return (
      <section className="container my-4">
        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          {props.children}
        </div>
      </section>
    );
  }

  return <section className="container my-4">{props.children}</section>;
};

export default container;
