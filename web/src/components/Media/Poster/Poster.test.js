import React from 'react';

import Poster from './Poster';

describe('<Poster />', () => {
  it('renders with correct props', () => {
    const id = 0;
    const title = 'Title';
    const type = 'movie';
    const comp = shallow(<Poster id={id} title={title} type={type} />);

    expect(comp).toBeTruthy();
    // TODO: Set correct poster url
    expect(comp.find('img[src="/poster.jpg"]').length).toBe(1);
    expect(comp.find('img[alt="' + title + '"]').length).toBe(1);
    expect(comp.find('.poster-text').text()).toBe(title);
    expect(comp.find('.poster-cover').length).toBe(1);
    expect(comp.find('.poster-episode').length).toBe(0);
  });

  it('should render episode poster', () => {
    const id = 0;
    const title = 'Title';
    const type = 'episode';
    const comp = shallow(<Poster id={id} title={title} type={type} />);

    expect(comp).toBeTruthy();
    // TODO: Set correct poster url
    expect(comp.find('img[src="/poster.jpg"]').length).toBe(1);
    expect(comp.find('img[alt="' + title + '"]').length).toBe(1);
    expect(comp.find('.poster-text').text()).toBe(title);
    expect(comp.find('.poster-cover').length).toBe(0);
    expect(comp.find('.poster-episode').length).toBe(1);
  });
});
