import React from 'react';

import NavItem from './NavItem';

describe('<NavItem />', () => {
  it('renders without crashing', () => {
    const comp = shallow(<NavItem to="" />);
    expect(comp).toBeTruthy();
  });

  it('should render text with link', () => {
    const text = 'Menu text';
    const to = '/link';
    const comp = shallow(<NavItem text={text} to={to} />);

    expect(comp.find('NavLink[to="' + to + '"]').length).toBe(1);
    expect(comp.find('NavLink').props().children).toBe(text);
  });

  it('should set text color', () => {
    const text = 'Menu text';
    const to = '/link';
    const color = 'primary';
    const comp = shallow(<NavItem text={text} to={to} color={color} />);

    expect(comp.find('NavLink[to="' + to + '"]').length).toBe(1);
    expect(comp.find('NavLink').props().className).toMatch(color);
  });
});
