import React from 'react';

import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('renders without crashing', () => {
    const comp = shallow(<NotFound />);
    expect(comp).toBeTruthy();
  });
});
