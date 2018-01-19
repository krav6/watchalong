import React from 'react';
import ReactDOM from 'react-dom';

import AlertDanger from './AlertDanger';

describe('<AlertDanger />', () => {
  it('renders without crashing', () => {
    expect(shallow(<AlertDanger />)).toBeTruthy();
  });

  it('should display nothing', () => {
    const message = null;
    const comp = shallow(<AlertDanger message={message} />);
    expect(comp.find('div').exists()).toBe(false);
  });

  it('should display prop message', () => {
    const message = 'Test';
    const comp = shallow(<AlertDanger message={message} />);
    expect(comp.find('div.alert.alert-danger').text()).toEqual(message);
  });
});
