import * as actionTypes from '../actions/actionTypes';
import reducer, { initialState } from './auth';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should set error message', () => {
    const errorMessage = 'Error message';
    expect(
      reducer(
        { ...initialState, isLoading: true },
        {
          type: actionTypes.AUTH_SET_ERROR,
          payload: { errorMessage: errorMessage }
        }
      )
    ).toEqual({
      ...initialState,
      errorMessage: errorMessage,
      isLoading: false
    });
  });

  it('should set loading', () => {
    const isLoading = true;
    expect(
      reducer(
        { ...initialState, errorMessage: 'Error' },
        {
          type: actionTypes.AUTH_SET_LOADING,
          payload: { isLoading }
        }
      )
    ).toEqual({
      ...initialState,
      errorMessage: null,
      isLoading
    });
  });

  it('should set token', () => {
    const token = 'Token';
    expect(
      reducer(
        { ...initialState, isLoading: true },
        {
          type: actionTypes.AUTH_SET_TOKEN,
          payload: { token: token }
        }
      )
    ).toEqual({
      ...initialState,
      isLoading: false,
      token: token
    });
  });
});
