import React from 'react';

import ChatInput from './ChatInput';

describe('<ChatInput />', () => {
  it('renders without crashing', () => {
    const inputMessage = 'Message';
    const onFormChange = jest.fn();
    const comp = shallow(
      <ChatInput inputMessage={inputMessage} onFormChange={onFormChange} />
    );

    expect(comp).toBeTruthy();
    expect(comp.find('input[type="text"]').prop('value')).toBe(inputMessage);
    expect(onFormChange).toHaveBeenCalledTimes(0);
    comp.find('input[type="text"]').simulate('change', {});
    expect(onFormChange).toHaveBeenCalled();
  });
});
