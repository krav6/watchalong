import React from 'react';

import { Chat } from './Chat';

describe('<Chat />', () => {
  it('renders without crashing', () => {
    const match = {
      params: {
        id: 0,
        type: 'movie'
      }
    };
    const messages = [];
    const fetchMediaInfo = jest.fn();
    const loadMessages = jest.fn();
    const comp = shallow(
      <Chat
        match={match}
        messages={messages}
        fetchMediaInfo={fetchMediaInfo}
        loadMessages={loadMessages}
      />
    );
    expect(comp).toBeTruthy();

    expect(fetchMediaInfo).toHaveBeenCalledWith(
      match.params.id,
      match.params.type
    );
    expect(loadMessages).toHaveBeenCalledWith(0);
    expect(comp.find('.alert.alert-info').length).toBe(0);
  });

  it('should display loading', () => {
    const match = { params: { id: 0, type: 'movie' } };
    const messages = [];
    const fetchMediaInfo = jest.fn();
    const loadMessages = jest.fn();
    const comp = shallow(
      <Chat
        match={match}
        messages={messages}
        fetchMediaInfo={fetchMediaInfo}
        loadMessages={loadMessages}
        isLoading={true}
      />
    );

    expect(comp.find('.alert.alert-info').length).toBe(1);
    expect(comp.find('.alert.alert-info').text()).toBe('Loading...');
  });

  it('should increment time', () => {
    const match = { params: { id: 0, type: 'movie' } };
    const messages = [];
    const fetchMediaInfo = jest.fn();
    const loadMessages = jest.fn();
    const comp = shallow(
      <Chat
        match={match}
        messages={messages}
        fetchMediaInfo={fetchMediaInfo}
        loadMessages={loadMessages}
      />
    );

    let time = 0;
    expect(comp.state().time).toBe(time++);
    comp.instance().incrementTime();
    expect(comp.state().time).toBe(time++);
    comp.instance().incrementTime();
    expect(comp.state().time).toBe(time);
  });

  it('should set state according to form', () => {
    const match = { params: { id: 0, type: 'movie' } };
    const messages = [];
    const fetchMediaInfo = jest.fn();
    const loadMessages = jest.fn();
    const comp = shallow(
      <Chat
        match={match}
        messages={messages}
        fetchMediaInfo={fetchMediaInfo}
        loadMessages={loadMessages}
      />
    );

    const name = 'inputName';
    const value = 'inputValue';
    expect(comp.state()[name]).toBeUndefined();
    comp.instance().onFormChange({ target: { name, value } });
    expect(comp.state()[name]).toBe(value);
  });

  it('should toggle play', () => {
    const match = { params: { id: 0, type: 'movie' } };
    const messages = [];
    const fetchMediaInfo = jest.fn();
    const loadMessages = jest.fn();
    const comp = shallow(
      <Chat
        match={match}
        messages={messages}
        fetchMediaInfo={fetchMediaInfo}
        loadMessages={loadMessages}
      />
    );

    expect(comp.state().isPlaying).toBe(false);
    expect(comp.state().intervalId).toBeNull();
    comp.instance().togglePlay();
    expect(comp.state().isPlaying).toBe(true);
    expect(comp.state().intervalId).toBeUndefined();
    comp.instance().togglePlay();
    expect(comp.state().isPlaying).toBe(false);
    expect(comp.state().intervalId).toBeNull();
  });

  it('should display messages within interval', () => {
    const match = { params: { id: 0, type: 'movie' } };
    const messages = [
      { id: 0, time: 0, score: 1, voted: false },
      { id: 1, time: 4, score: 5, voted: true },
      { id: 100, time: 6, score: 0, voted: false },
      { id: 98, time: 10, score: 4, voted: false },
      { id: 111, time: 905, score: 9, voted: false }
    ];
    const fetchMediaInfo = jest.fn();
    const loadMessages = jest.fn();
    const onMessageClick = jest.fn();
    const comp = shallow(
      <Chat
        match={match}
        messages={messages}
        fetchMediaInfo={fetchMediaInfo}
        loadMessages={loadMessages}
        onMessageClick={onMessageClick}
      />
    );

    expect(comp.find('ChatMessage').length).toBe(4);
    expect(
      comp
        .find('ChatMessage')
        .at(0)
        .props().id
    ).toBe(messages[0].id);
    expect(
      comp
        .find('ChatMessage')
        .at(0)
        .props().onMessageClick
    ).toBe(onMessageClick);
    expect(
      comp
        .find('ChatMessage')
        .at(0)
        .props().posX
    ).toBe(50);
    expect(
      comp
        .find('ChatMessage')
        .at(0)
        .props().posY
    ).toBe(0);
    expect(
      comp
        .find('ChatMessage')
        .at(1)
        .props().id
    ).toBe(messages[1].id);
    expect(
      comp
        .find('ChatMessage')
        .at(1)
        .props().onMessageClick
    ).toBe(onMessageClick);
    expect(
      comp
        .find('ChatMessage')
        .at(1)
        .props().posX
    ).toBe(90);
    expect(
      comp
        .find('ChatMessage')
        .at(1)
        .props().posY
    ).toBe(10);
    expect(
      comp
        .find('ChatMessage')
        .at(2)
        .props().id
    ).toBe(messages[2].id);
    expect(
      comp
        .find('ChatMessage')
        .at(2)
        .props().onMessageClick
    ).toBe(onMessageClick);
    expect(
      comp
        .find('ChatMessage')
        .at(2)
        .props().posX
    ).toBe(110);
    expect(
      comp
        .find('ChatMessage')
        .at(2)
        .props().posY
    ).toBe(20);
    expect(
      comp
        .find('ChatMessage')
        .at(3)
        .props().id
    ).toBe(messages[3].id);
    expect(
      comp
        .find('ChatMessage')
        .at(3)
        .props().onMessageClick
    ).toBe(onMessageClick);
    expect(
      comp
        .find('ChatMessage')
        .at(3)
        .props().posX
    ).toBe(150);
    expect(
      comp
        .find('ChatMessage')
        .at(3)
        .props().posY
    ).toBe(30);
  });
});
