import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

describe('<App />', () => {
  it('renders without crashing', () => {
    const comp = shallow(<App />);
    expect(comp).toBeTruthy();
  });
});
