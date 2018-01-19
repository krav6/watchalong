import React from 'react';

import TvShow from './TvShow';

describe('<TvShow />', () => {
  it('renders without crashing', () => {
    const match = { params: { id: 0 } };
    const comp = shallow(<TvShow match={match} />);
    expect(comp).toBeTruthy();
  });
});
