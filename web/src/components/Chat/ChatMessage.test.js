import React from 'react';

import ChatMessage from './ChatMessage';

describe('<ChatMessage />', () => {
  it('renders without crashing', () => {
    const id = 1;
    const onMessageClick = jest.fn();
    const posX = 20;
    const posY = 50;
    const score = 5;
    const text = 'This is the content';
    const comp = shallow(
      <ChatMessage
        id={id}
        onMessageClick={onMessageClick}
        posX={posX}
        posY={posY}
        score={score}
        voted={false}
      >
        {text}
      </ChatMessage>
    );

    expect(comp).toBeTruthy();
    expect(comp.find('button').length).toBe(1);

    expect(
      comp
        .find('button')
        .at(0)
        .prop('style')
    ).toEqual({ top: posY + '%', left: posX + '%' });

    expect(comp.text()).toEqual(text);
  });

  it('should be able to vote', () => {
    const id = 1;
    const onMessageClick = jest.fn();
    const posX = 20;
    const posY = 50;
    const score = 5;
    const text = 'This is the content';
    const comp = shallow(
      <ChatMessage
        id={id}
        onMessageClick={onMessageClick}
        posX={posX}
        posY={posY}
        score={score}
        voted={false}
      >
        {text}
      </ChatMessage>
    );

    expect(comp).toBeTruthy();
    expect(comp.find('button').length).toBe(1);

    expect(onMessageClick).toHaveBeenCalledTimes(0);
    comp
      .find('button')
      .simulate('click', { target: { classList: { add: () => true } } });
    expect(onMessageClick).toHaveBeenCalled();
  });

  it('should not be able to vote again', () => {
    const id = 1;
    const onMessageClick = jest.fn();
    const posX = 20;
    const posY = 50;
    const score = 5;
    const text = 'This is the content';
    const comp = shallow(
      <ChatMessage
        id={id}
        onMessageClick={onMessageClick}
        posX={posX}
        posY={posY}
        score={score}
        voted={true}
      >
        {text}
      </ChatMessage>
    );

    expect(comp).toBeTruthy();

    expect(
      comp
        .find('button')
        .at(0)
        .prop('style')
    ).toEqual({ top: posY + '%', left: posX + '%' });
    expect(onMessageClick).toHaveBeenCalledTimes(0);
    comp
      .find('button')
      .simulate('click', { target: { classList: { add: () => true } } });
    expect(onMessageClick).toHaveBeenCalledTimes(0);

    expect(comp.text()).toEqual(text);
  });
});
