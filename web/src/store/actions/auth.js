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

const setLoading = isLoading => ({
  type: actionTypes.AUTH_SET_LOADING,
  payload: {
    isLoading
  }
});

const tryAuth = (url, data) => {
  return async dispatch => {
    dispatch(setLoading(true));

    try {
      const result = await axios.post(url, data);
      return dispatch(setToken(result.data.token));
    } catch (err) {
      const errorMessage =
        (((err || {}).response || {}).data || {}).message ||
        'A network error has occured';
      return dispatch(setErrorMessage(errorMessage));
    }
  };
};

export const tryLogin = (email, password) => {
  return tryAuth('users/login', { email, password });
};

export const tryRegister = (email, username, password) => {
  return tryAuth('users/register', { email, username, password });
};
