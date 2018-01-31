import React from 'react';

import ChatControls from './ChatControls';

describe('<ChatControls />', () => {
  it('renders without crashing', () => {
    const displayTime = '01:30';
    const isPlaying = false;
    const onFormChange = jest.fn();
    const togglePlay = jest.fn();
    const time = 90;
    const videoLength = 120;
    const comp = shallow(
      <ChatControls
        displayTime={displayTime}
        isPlaying={isPlaying}
        onFormChange={onFormChange}
        time={time}
        togglePlay={togglePlay}
        videoLength={videoLength}
      />
    );

    expect(comp).toBeTruthy();
    expect(
      comp
        .find('button.btn')
        .childAt(0)
        .props().icon.iconName
    ).toBe('play');
    expect(togglePlay).toHaveBeenCalledTimes(0);
    comp.find('.btn').simulate('click');
    expect(togglePlay).toHaveBeenCalledTimes(1);
    const range = comp.find('input[type="range"]');
    expect(range.prop('value')).toBe(time);
    expect(range.prop('max')).toBe(videoLength);
    expect(onFormChange).toHaveBeenCalledTimes(0);
    range.simulate('change');
    expect(onFormChange).toHaveBeenCalledTimes(1);
  });

  it('should display Pause when isPlaying is true', () => {
    const displayTime = '01:30';
    const isPlaying = true;
    const onFormChange = jest.fn();
    const togglePlay = jest.fn();
    const time = 90;
    const videoLength = 120;
    const comp = shallow(
      <ChatControls
        displayTime={displayTime}
        isPlaying={isPlaying}
        onFormChange={onFormChange}
        time={time}
        togglePlay={togglePlay}
        videoLength={videoLength}
      />
    );

    expect(comp).toBeTruthy();
    expect(
      comp
        .find('button.btn')
        .childAt(0)
        .props().icon.iconName
    ).toBe('pause');
  });
});
