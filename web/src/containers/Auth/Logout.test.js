import React from 'react';
import { Redirect } from 'react-router-dom';

import { Logout } from './Logout';

describe('<Logout />', () => {
  it('renders without crashing', () => {
    expect(shallow(<Logout setToken={() => true} />)).toBeTruthy();
  });

  it('should redirect', () => {
    const comp = shallow(<Logout setToken={() => true} />);

    expect(comp.contains(<Redirect to="/" />)).toBe(true);
  });

  it('should clear token', () => {
    localStorage.setItem('token', 'token');
    const setToken = jest.fn();
    const comp = shallow(<Logout setToken={setToken} />);

    expect(setToken).toHaveBeenCalledWith(null);
  });
});
