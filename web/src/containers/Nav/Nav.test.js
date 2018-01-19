import React from 'react';
import { NavLink } from 'react-router-dom';

import { Nav } from './Nav';

describe('<Nav />', () => {
  it('renders without crashing', () => {
    expect(shallow(<Nav />)).toBeTruthy();
  });

  it('should toggle menu when clicked on toggle button', () => {
    const comp = shallow(<Nav />);
    const button = comp.find('button[data-toggle="collapse"]').at(0);

    expect(comp.state().isMenuShown).toBe(false);
    button.simulate('click');
    expect(comp.state().isMenuShown).toBe(true);
    button.simulate('click');
    expect(comp.state().isMenuShown).toBe(false);
  });

  it('should display login and register when not authenticated', () => {
    const comp = shallow(<Nav authenticated={false} />);

    expect(comp.find('navItem[to="/login"]').length).toEqual(1);
    expect(comp.find('navItem[to="/register"]').length).toEqual(1);
    expect(comp.find('navItem[to="/logout"]').length).toEqual(0);
  });

  it('should display logout when authenticated', () => {
    const comp = shallow(<Nav authenticated={true} />);

    expect(comp.find('navItem[to="/login"]').length).toEqual(0);
    expect(comp.find('navItem[to="/register"]').length).toEqual(0);
    expect(comp.find('navItem[to="/logout"]').length).toEqual(1);
  });
});
