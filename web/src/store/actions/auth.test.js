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
  });

  it('should set token when login successful', () => {
    const email = 'a@a.com';
    const password = 'password12';
    const token = 'token';
    const expectedActions = [
      { type: actionTypes.AUTH_SET_ERROR, payload: { errorMessage: null } },
      {
        type: actionTypes.AUTH_SET_TOKEN,
        payload: { token: token }
      }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { token: 'token' }
      });
    });

    const store = mockStore({});

    return store.dispatch(actions.tryLogin(email, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should set error when login credentials invalid', () => {
    const email = 'a@a.com';
    const password = 'password123';
    const errorMessage = 'Invalid login credentials';
    const expectedActions = [
      { type: actionTypes.AUTH_SET_ERROR, payload: { errorMessage: null } },
      {
        type: actionTypes.AUTH_SET_ERROR,
        payload: { errorMessage: errorMessage }
      }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: { error: errorMessage } });
    });

    const store = mockStore({});

    return store.dispatch(actions.tryLogin(email, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should set token when registration successful', () => {
    const email = 'a@a.com';
    const username = 'asdf';
    const password = 'password12';
    const token = 'token';
    const expectedActions = [
      { type: actionTypes.AUTH_SET_ERROR, payload: { errorMessage: null } },
      {
        type: actionTypes.AUTH_SET_TOKEN,
        payload: { token: token }
      }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { token: 'token' } });
    });

    const store = mockStore({});

    return store
      .dispatch(actions.tryRegister(email, username, password))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should set error message when registration failed', () => {
    const email = 'a@a.com';
    const username = 'asdf';
    const password = 'password12';
    const errorMessage = 'Registration failed';
    const expectedActions = [
      { type: actionTypes.AUTH_SET_ERROR, payload: { errorMessage: null } },
      {
        type: actionTypes.AUTH_SET_ERROR,
        payload: { errorMessage: errorMessage }
      }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: { error: errorMessage } });
    });

    const store = mockStore({});

    return store
      .dispatch(actions.tryRegister(email, username, password))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
