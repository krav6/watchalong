import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  errorMessage: null,
  isLoading: false,
  token: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        isLoading: false
      };

    case actionTypes.AUTH_SET_LOADING:
      return {
        ...state,
        errorMessage: null,
        isLoading: action.payload.isLoading
      };

    case actionTypes.AUTH_SET_TOKEN:
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        token: action.payload.token
      };

    default:
      return state;
  }
};

export default reducer;
