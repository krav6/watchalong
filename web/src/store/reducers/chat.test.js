import * as actionTypes from '../actions/actionTypes';
import reducer, { initialState } from './chat';

describe('chat reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should init chat state', () => {
    const id = 1;
    const name = 'Name';
    const type = 'movie';
    const videoLength = 10;
    expect(
      reducer(initialState, {
        type: actionTypes.CHAT_INIT,
        payload: { id, name, type, videoLength }
      })
    ).toEqual({
      ...initialState,
      id,
      name,
      type,
      videoLength
    });
  });

  it('should set loading state to true', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.CHAT_SET_LOADING,
        payload: { isLoading: true }
      })
    ).toEqual({ ...initialState, isLoading: true });
  });

  it('should set loading state to false', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.CHAT_SET_LOADING,
        payload: { isLoading: false }
      })
    ).toEqual({ ...initialState, isLoading: false });
  });

  it('should add messages', () => {
    const messages = [{ id: 1, time: 0 }, { id: 10, time: 2 }];
    const newMessage = { id: 30, time: 1 };
    const messagesResult = [
      { id: 1, time: 0 },
      newMessage,
      { id: 10, time: 2 }
    ];
    expect(
      reducer(
        { ...initialState, messages },
        {
          type: actionTypes.CHAT_ADD_MESSAGES,
          payload: { messages: [newMessage] }
        }
      )
    ).toEqual({
      ...initialState,
      messages: messagesResult
    });
  });

  it('should set vote to true', () => {
    const begin = {
      id: 1,
      type: 'movie',
      messages: [
        { id: 1, voted: false, posY: 0 },
        { id: 2, voted: false, posY: 10 }
      ]
    };
    const end = {
      id: 1,
      type: 'movie',
      messages: [
        { id: 1, voted: false, posY: 0 },
        { id: 2, voted: true, posY: 10 }
      ]
    };
    expect(
      reducer(begin, {
        type: actionTypes.CHAT_VOTE,
        payload: { id: 2 }
      })
    ).toEqual(end);
  });
});
