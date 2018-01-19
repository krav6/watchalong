import React from 'react';

import Movie from './Movie';

describe('<Movie />', () => {
  it('renders without crashing', () => {
    const match = { params: { id: 0 } };
    const comp = shallow(<Movie match={match} />);
    expect(comp).toBeTruthy();
  });
});
