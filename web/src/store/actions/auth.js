import * as actionTypes from './actionTypes';
import axios from 'axiosWaApi';

const setToken = token => ({
  type: actionTypes.AUTH_SET_TOKEN,
  payload: {
    token: token
  }
});

export const setErrorMessage = errorMessage => ({
  type: actionTypes.AUTH_SET_ERROR,
  payload: {
    errorMessage: errorMessage
  }
});

export const tryLogin = (email, password) => {
  return async dispatch => {
    dispatch(setErrorMessage(null));

    try {
      const result = await axios.post('login', {
        email: email,
        password: password
      });
      if (result.status === 200) {
        return dispatch(setToken(result.data.token));
      } else {
        return dispatch(setErrorMessage(result.data.error));
      }
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.error || 'A network error has occured'
        : 'A network error has occured';
      return dispatch(setErrorMessage(errorMessage));
    }
  };
};

export const tryRegister = (email, username, password) => {
  return async dispatch => {
    dispatch(setErrorMessage(null));

    try {
      const result = await axios.post('register', {
        email: email,
        username: username,
        password: password
      });
      if (result.status === 200) {
        dispatch(setToken(result.data.token));
      } else {
        return dispatch(setErrorMessage(result.data.error));
      }
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.error || 'A network error has occured'
        : 'A network error has occured';
      return dispatch(setErrorMessage(errorMessage));
    }
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(setToken(null));
  };
};
