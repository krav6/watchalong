import React from 'react';

import PrivateRoute from './PrivateRoute';

describe('<PrivateRoute />', () => {
  it('should render component when condition is true', () => {
    const component = () => <div>Component</div>;
    const condition = true;
    const path = '/path';
    const redirectTo = '/redirect';
    const comp = shallow(
      <PrivateRoute
        component={component}
        condition={condition}
        path={path}
        redirectTo={redirectTo}
      />
    );

    expect(comp).toBeTruthy();
    expect(comp.find('Route').length).toBe(1);
    expect(comp.find('Redirect').length).toBe(0);
    expect(comp.find('Route').props().path).toBe(path);
    expect(comp.find('Route').props().component).toBe(component);
  });

  it('should redirect when condition is false', () => {
    const component = () => <div>Component</div>;
    const condition = false;
    const path = '/path';
    const redirectTo = '/redirect';
    const location = 'location';
    const comp = shallow(
      <PrivateRoute
        component={component}
        condition={condition}
        path={path}
        redirectTo={redirectTo}
        location={location}
      />
    );

    expect(comp).toBeTruthy();
    expect(comp.find('Route').length).toBe(0);
    expect(comp.find('Redirect').length).toBe(1);
    expect(comp.find('Redirect').props().to).toEqual({
      pathname: redirectTo,
      state: { from: location }
    });
  });
});
