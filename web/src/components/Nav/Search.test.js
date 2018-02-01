import React from 'react';

import Search from './Search';

describe('<Search />', () => {
  it('renders without crashing', () => {
    const comp = shallow(<Search />);
    expect(comp).toBeTruthy();
  });

  it('should submit values (all)', () => {
    const push = jest.fn();
    const preventDefault = jest.fn();
    const comp = shallow(<Search history={{ push }} />);
    const title = 'Title for default';

    expect(comp).toBeTruthy();
    comp
      .find('input[name="title"]')
      .simulate('change', { target: { name: 'title', value: title } });
    comp.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith(
      `/search/all/${encodeURIComponent(title)}`
    );
    expect(comp.state()).toEqual({ title: '', type: 'all' });
  });

  it('should submit values (movies)', () => {
    const push = jest.fn();
    const preventDefault = jest.fn();
    const comp = shallow(<Search history={{ push }} />);
    const title = 'Title';
    const type = 'movies';

    expect(comp).toBeTruthy();
    comp
      .find('input[name="title"]')
      .simulate('change', { target: { name: 'title', value: title } });
    comp
      .find('select')
      .simulate('change', { target: { name: 'type', value: type } });
    comp.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith(
      `/search/${type}/${encodeURIComponent(title)}`
    );
    expect(comp.state()).toEqual({ title: '', type: 'all' });
  });

  it('should submit values (tv show)', () => {
    const push = jest.fn();
    const preventDefault = jest.fn();
    const comp = shallow(<Search history={{ push }} />);
    const title = 'Title /with special';
    const type = 'tv-show';

    expect(comp).toBeTruthy();
    comp
      .find('input[name="title"]')
      .simulate('change', { target: { name: 'title', value: title } });
    comp
      .find('select')
      .simulate('change', { target: { name: 'type', value: type } });
    comp.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith(
      `/search/${type}/${encodeURIComponent(title)}`
    );
    expect(comp.state()).toEqual({ title: '', type: 'all' });
  });
});
