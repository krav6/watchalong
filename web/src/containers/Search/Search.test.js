import React from 'react';

import Search from './Search';

describe('<Search />', () => {
  it('renders without crashing', () => {
    const title = 'Tit/le';
    const type = 'all';
    const match = { params: { title: encodeURIComponent(title), type } };
    const comp = shallow(<Search match={match} />);

    expect(comp).toBeTruthy();
    expect(comp.find('h1 span.text-primary').text()).toBe(title);
    expect(comp.find('h3').text()).toBe('Movies & TV Shows');
  });

  it('should display movies', () => {
    const title = 'Tit/le';
    const type = 'movie';
    const match = { params: { title: encodeURIComponent(title), type } };
    const comp = shallow(<Search match={match} />);

    expect(comp).toBeTruthy();
    expect(comp.find('h1 span.text-primary').text()).toBe(title);
    expect(comp.find('h3').text()).toBe('Movies');
  });

  it('renders without crashing', () => {
    const title = 'Tit/le';
    const type = 'tv-show';
    const match = { params: { title: encodeURIComponent(title), type } };
    const comp = shallow(<Search match={match} />);

    expect(comp).toBeTruthy();
    expect(comp.find('h1 span.text-primary').text()).toBe(title);
    expect(comp.find('h3').text()).toBe('TV Shows');
  });
});
