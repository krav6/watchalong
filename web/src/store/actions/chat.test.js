import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import * as actionTypes from './actionTypes';
import * as actions from './chat';
import axios from 'axiosWaApi';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('chat actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  it('should init chat', async () => {
    const id = 0;
    const name = 'Name';
    const type = 'movie';
    const videoLength = 120;
    const expectedActions = [
      { type: actionTypes.CHAT_INIT, payload: { id, name, type, videoLength } }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { id, name, type, videoLength }
      });
    });

    const store = mockStore({});

    await store.dispatch(actions.fetchMediaInfo(id, type));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fetch messages', async () => {
    const id = 0;
    const type = 'movie';
    const messages = [{ id: 1 }];
    const expectedActions = [
      { type: actionTypes.CHAT_SET_LOADING, payload: { isLoading: true } },
      { type: actionTypes.CHAT_ADD_MESSAGES, payload: { messages } },
      { type: actionTypes.CHAT_SET_LOADING, payload: { isLoading: false } }
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { messages } });
    });

    const store = mockStore({});

    await store.dispatch(actions.loadMessages(0));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should set voted to true', async () => {
    const id = 1;
    const expectedActions = [{ type: actionTypes.CHAT_VOTE, payload: { id } }];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { id } });
    });

    const store = mockStore({});

    await store.dispatch(actions.setVoted(id));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
