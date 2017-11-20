import * as types from '../actions/types';

export const getInitialState = () => ({
  loading: false,
  data: [],
  error: null
});

export default (prevState = getInitialState(), action) => {
  switch (action.type) {
  case types.FETCH_ARTICLES_REQUEST:
    return Object.assign({}, prevState, {
      loading: true,
      data: [],
      error: null
    });
  case types.FETCH_ARTICLES_SUCCESS:
    return Object.assign({}, prevState, {
      loading: false,
      data: action.payload,
      error: null
    });
  case types.FETCH_ARTICLES_FAILURE:
    return Object.assign({}, prevState, {
      loading: false,
      data: [],
      error: action.payload
    });
  case types.VOTE_ARTICLES_REQUEST:
    return Object.assign({}, prevState, {
      loading: true,
      data: [],
      error: null
    });
  case types.VOTE_ARTICLES_SUCCESS:
    const newState = Object.assign({}, prevState);
    const newData = newState.data.map((obj) => {
      if (obj._id === action.payload._id) {
        obj = action.payload;
        return obj;
      }
      return obj;
    });
    newState.data = newData;
    newState.data[0].comments = prevState.data[0].comments;
    return newState;
  case types.VOTE_ARTICLES_FAILURE:
    return Object.assign({}, prevState, {
      loading: false,
      data: [],
      error: action.payload
    });
  default:
    return prevState;
  }
};