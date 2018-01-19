import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import * as actionTypes from './actionTypes';
import * as actions from './auth';
import axios from 'axiosWaApi';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
    localStorage.clear();
  });

  it('should set token', async () => {
    const token = 'token';
    const expectedActions = [
      { type: actionTypes.AUTH_SET_TOKEN, payload: { token } }
    ];

    const store = mockStore({});

    await store.dispatch(actions.setToken(token));
    expect(store.getActions()).toEqual(expectedActions);
    expect(localStorage.getItem('token')).toEqual(token);
  });

  it('should set error message', async () => {
    const errorMessage = 'error';
    const expectedActions = [
      { type: actionTypes.AUTH_SET_ERROR, payload: { errorMessage } }
    ];

    const store = mockStore({});

    await store.dispatch(actions.setErrorMessage(errorMessage));
  });

  it('should set token when login successful', async () => {
    const email = 'a@a.com';
    const password = 'password12';
    const token = 'token';
    const expectedActions = [
      { type: actionTypes.AUTH_SET_ERROR, payload: { errorMessage: null } },
      {
        type: actionTypes.AUTH_SET_TOKEN,
        payload: { token }
      }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { token }
      });
    });

    const store = mockStore({});

    await store.dispatch(actions.tryLogin(email, password));

    expect(store.getActions()).toEqual(expectedActions);
    expect(localStorage.getItem('token')).toEqual(token);
  });

  it('should set error when login credentials invalid', async () => {
    const email = 'a@a.com';
    const password = 'password123';
    const errorMessage = 'Invalid login credentials';
    const expectedActions = [
      { type: actionTypes.AUTH_SET_ERROR, payload: { errorMessage: null } },
      {
        type: actionTypes.AUTH_SET_ERROR,
        payload: { errorMessage }
      }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: { message: errorMessage } });
    });

    const store = mockStore({});

    await store.dispatch(actions.tryLogin(email, password));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should set token when registration successful', async () => {
    const email = 'a@a.com';
    const username = 'asdf';
    const password = 'password12';
    const token = 'token';
    const expectedActions = [
      { type: actionTypes.AUTH_SET_ERROR, payload: { errorMessage: null } },
      {
        type: actionTypes.AUTH_SET_TOKEN,
        payload: { token }
      }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 201, response: { token } });
    });

    const store = mockStore({});

    await store.dispatch(actions.tryRegister(email, username, password));
    expect(store.getActions()).toEqual(expectedActions);
    expect(localStorage.getItem('token')).toEqual(token);
  });

  it('should set error message when registration failed', async () => {
    const email = 'a@a.com';
    const username = 'asdf';
    const password = 'password12';
    const errorMessage = 'Registration failed';
    const expectedActions = [
      { type: actionTypes.AUTH_SET_ERROR, payload: { errorMessage: null } },
      {
        type: actionTypes.AUTH_SET_ERROR,
        payload: { errorMessage }
      }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: { message: errorMessage } });
    });

    const store = mockStore({});

    await store.dispatch(actions.tryRegister(email, username, password));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
