import React from 'react';

import List from './List';

describe('<List />', () => {
  it('renders empty list', () => {
    const name = 'List name';
    const items = [];
    const link = '/link';
    const comp = shallow(<List name={name} items={items} link={link} />);

    expect(comp).toBeTruthy();
    expect(comp.find('h2').text()).toBe(name);
    expect(comp.find('.alert').length).toBe(1);
    expect(comp.find('poster').length).toBe(0);
  });

  it('should not display name and link', () => {
    const items = [];
    const comp = shallow(<List items={items} />);

    expect(comp).toBeTruthy();
    expect(comp.find('h2').length).toBe(0);
    expect(comp.find('.alert').length).toBe(1);
    expect(comp.find('poster').length).toBe(0);
    expect(comp.find('Link').length).toBe(0);
  });

  it('renders items', () => {
    const name = 'List name';
    const link = '/link';
    const type = ['movie', 'tv-show'];
    const items = [
      { id: 0, title: 'First element', type: type[0] },
      { id: 1, title: 'Second element', type: type[1] }
    ];
    const comp = shallow(<List name={name} items={items} link={link} />);

    expect(comp).toBeTruthy();
    expect(comp.find('h2').text()).toBe(name);
    expect(comp.find('.alert').length).toBe(0);
    expect(comp.find('poster').length).toBe(2);
    expect(comp.find('Link[to="' + link + '"]').length).toBe(1);
    comp.find('poster').forEach((element, idx) => {
      expect(element.props().id).toBe(items[idx].id);
      expect(element.props().title).toBe(items[idx].title);
      expect(element.props().type).toBe(type[idx]);
    });
  });
});
