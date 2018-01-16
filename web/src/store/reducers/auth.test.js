import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

describe('auth reducer', () => {
  const initialState = {
    token: null,
    errorMessage: null
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should set error message', () => {
    const errorMessage = 'Error message';
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SET_ERROR,
        payload: { errorMessage: errorMessage }
      })
    ).toEqual({
      ...initialState,
      errorMessage: errorMessage
    });
  });

  it('should set token', () => {
    const token = 'Token';
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SET_TOKEN,
        payload: { token: token }
      })
    ).toEqual({
      ...initialState,
      token: token
    });
  });
});
