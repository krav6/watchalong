import React from 'react';

const main = props => {
  if (props.small) {
    return (
      <section className="container my-4 app-main">
        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          {props.children}
        </div>
      </section>
    );
  }

  if (props.large) {
    return <section className="app-main">{props.children}</section>;
  }

  return (
    <section className="container my-4 app-main">{props.children}</section>
  );
};

export default main;
