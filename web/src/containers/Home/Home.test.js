import React from 'react';

import Home from './Home';

describe('<Home />', () => {
  it('renders without crashing', () => {
    const comp = shallow(<Home />);
    expect(comp).toBeTruthy();
  });
});
