import React from 'react';

import Footer from './Footer';

describe('<Footer />', () => {
  it('renders without crashing', () => {
    const comp = shallow(<Footer />);
    expect(comp).toBeTruthy();
  });
});
