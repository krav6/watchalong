import React from 'react';

import Search from './Search';

describe('<Search />', () => {
  it('renders without crashing', () => {
    const comp = shallow(<Search />);
    expect(comp).toBeTruthy();
  });
});
