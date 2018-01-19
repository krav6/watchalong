import * as actionTypes from './actionTypes';
import axios from 'axiosWaApi';

export const setToken = token => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }

  return {
    type: actionTypes.AUTH_SET_TOKEN,
    payload: {
      token: token
    }
  };
};

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
      const result = await axios.post('users/login', {
        email,
        password
      });
      if (result.status === 200) {
        return dispatch(setToken(result.data.token));
      } else {
        return dispatch(setErrorMessage(result.data.message));
      }
    } catch (err) {
      const errorMessage =
        (((err || {}).response || {}).data || {}).message ||
        'A network error has occured';
      return dispatch(setErrorMessage(errorMessage));
    }
  };
};

export const tryRegister = (email, username, password) => {
  return async dispatch => {
    dispatch(setErrorMessage(null));

    try {
      const result = await axios.post('users/register', {
        email: email,
        username: username,
        password: password
      });
      if (result.status === 201) {
        dispatch(setToken(result.data.token));
      } else {
        return dispatch(setErrorMessage(result.data.message));
      }
    } catch (err) {
      const errorMessage =
        (((err || {}).response || {}).data || {}).message ||
        'A network error has occured';
      return dispatch(setErrorMessage(errorMessage));
    }
  };
};
