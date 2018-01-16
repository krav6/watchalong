import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  errorMessage: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      };

    case actionTypes.AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        errorMessage: null
      };

    default:
      return state;
  }
};

export default reducer;
