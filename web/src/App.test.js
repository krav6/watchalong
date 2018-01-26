import React from 'react';

import { App } from './App';

describe('<App />', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('renders without crashing', () => {
    const comp = shallow(<App authenticated={false} />);
    expect(comp).toBeTruthy();
  });

  it('should display login and register when not authenticated', () => {
    const comp = shallow(<App authenticated={false} />);
    expect(
      comp.find('privateRoute[path="/login"][condition=true]').length
    ).toBe(1);
    expect(
      comp.find('privateRoute[path="/register"][condition=true]').length
    ).toBe(1);
    expect(
      comp.find('privateRoute[path="/logout"][condition=false]').length
    ).toBe(1);
  });

  it('should display logout when authenticated', () => {
    const comp = shallow(<App authenticated={true} />);
    expect(
      comp.find('privateRoute[path="/login"][condition=false]').length
    ).toBe(1);
    expect(
      comp.find('privateRoute[path="/register"][condition=false]').length
    ).toBe(1);
    expect(
      comp.find('privateRoute[path="/logout"][condition=true]').length
    ).toBe(1);
  });

  it('should auto login', () => {
    // exp: 9999999999
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjo5OTk5OTk5OTk5fQ.oQiuM7ZX9n0lGZL3aii_FZw2uAFnggBayZ6vV4HtugQ';
    localStorage.setItem('token', token);
    const setToken = jest.fn();
    const comp = shallow(<App authenticated={false} setToken={setToken} />);

    expect(setToken).toHaveBeenCalledWith(token);
  });

  it('should auto logout', () => {
    // exp: 1
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxfQ.ghVxi25RlcknpjjvctIIvRcTYxwmr9qTFBcFtCLBa1w'
    );
    const setToken = jest.fn();
    const comp = shallow(<App authenticated={false} setToken={setToken} />);

    expect(setToken).toHaveBeenCalledWith(null);
  });

  it('should have 404 as last route', () => {
    const comp = shallow(<App authenticated={false} setToken={() => true} />);

    const routesLength = comp.find('Route').length;
    expect(
      comp
        .find('Route')
        .at(routesLength - 1)
        .props().path
    ).toBeUndefined();
  });
});
