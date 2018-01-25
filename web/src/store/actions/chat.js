import * as actionTypes from './actionTypes';
import axios from 'axiosWaApi';

const initChat = (id, name, videoLength, type) => ({
  type: actionTypes.CHAT_INIT,
  payload: { id, name, videoLength, type }
});

export const load = isLoading => ({
  type: actionTypes.CHAT_LOADING,
  payload: { isLoading }
});

export const addMessages = messages => ({
  type: actionTypes.CHAT_ADD_MESSAGES,
  payload: { messages }
});

export const vote = id => ({
  type: actionTypes.CHAT_VOTE,
  payload: { id }
});

const fetchMessages = async time => {
  // TODO: load from API route
  try {
    const res = await axios.get('/messages');
    return res.data.messages;
  } catch (e) {
    return [];
  }
};

const sendVote = async id => {
  // TODO: send to API route
  try {
    await axios.get('/');
    return true;
  } catch (e) {
    // TODO: Error
    return false;
  }
};

export const fetchMediaInfo = (id, type) => {
  return async dispatch => {
    // TODO: Get info from API route
    let result;
    try {
      result = await axios.get('/mediainfo');
      if (result.data) {
        dispatch(
          initChat(
            id,
            result.data.name,
            result.data.videoLength,
            result.data.type
          )
        );
      } else {
        throw new Error('Invalid response');
      }
    } catch (e) {
      // TODO: Set error
      console.error(e);
    }
  };
};

export const loadMessages = time => {
  return async dispatch => {
    dispatch(load(true));
    const messages = await fetchMessages(time);
    dispatch(addMessages(messages));
    dispatch(load(false));
  };
};

export const setVoted = id => {
  return async dispatch => {
    if (await sendVote(id)) {
      dispatch(vote(id));
    } else {
      // TODO: Set error?
      console.error('Vote failed');
    }
  };
};

export const sendMessage = (id, type, text, time) => {
  return async dispatch => {
    // TODO: send to API
    dispatch(
      addMessages([
        {
          id: Math.random() * 10,
          type: type,
          text,
          time,
          score: 0,
          voted: false
        }
      ])
    );
  };
};
