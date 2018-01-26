import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  id: null,
  isLoading: false,
  videoLength: null,
  messages: [],
  name: '',
  type: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHAT_INIT:
      return {
        ...state,
        id: action.payload.id,
        isLoading: false,
        videoLength: action.payload.videoLength,
        messages: [],
        name: action.payload.name,
        type: action.payload.type
      };

    case actionTypes.CHAT_SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      };

    case actionTypes.CHAT_ADD_MESSAGES:
      return {
        ...state,
        messages: state.messages
          .concat(action.payload.messages)
          .sort((a, b) => a.time > b.time)
      };

    case actionTypes.CHAT_VOTE:
      return {
        ...state,
        messages: state.messages.map(val => {
          if (val.id === action.payload.id) {
            return { ...val, voted: true };
          } else {
            return val;
          }
        })
      };

    default:
      return state;
  }
};

export default reducer;
