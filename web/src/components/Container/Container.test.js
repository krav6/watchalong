import React from 'react';

import Container from './Container';

describe('<Container />', () => {
  it('renders without crashing', () => {
    const comp = shallow(<Container />);
    expect(comp).toBeTruthy();
    expect(comp.find('div').length).toBe(0);
  });

  it('renders small without crashing', () => {
    const comp = shallow(<Container small />);
    expect(comp).toBeTruthy();
    expect(comp.find('div').length).toBe(1);
  });
});
