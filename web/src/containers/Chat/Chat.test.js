import React from 'react';

import Chat from './Chat';

describe('<Chat />', () => {
  it('renders without crashing', () => {
    const match = {
      params: {
        id: 0,
        type: 'movie'
      }
    };
    const comp = shallow(<Chat match={match} />);
    expect(comp).toBeTruthy();
  });
});
