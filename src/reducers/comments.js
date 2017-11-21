import * as types from '../actions/types';

export const getInitialState = () => ({
  loading: false,
  data: [],
  error: null
});

export default (prevState = getInitialState(), action) => {
  switch (action.type) {
  case types.FETCH_COMMENTS_REQUEST:
    return Object.assign({}, prevState, {
      loading: true,
      data: [],
      error: null
    });
  case types.FETCH_COMMENTS_SUCCESS:
    return Object.assign({}, prevState, {
      loading: false,
      data: action.payload,
      error: null
    });
  case types.FETCH_COMMENTS_FAILURE:
    return Object.assign({}, prevState, {
      loading: false,
      data: [],
      error: action.payload
    });
  case types.POST_COMMENTS_REQUEST:
    return Object.assign({}, prevState, {
      loading: true,
      data: [],
      error: null
    });
  case types.POST_COMMENTS_SUCCESS:
    return Object.assign({}, prevState, {
      loading: false,
      data: action.payload,
      error: null
    });
  case types.POST_COMMENTS_FAILURE:
    return Object.assign({}, prevState, {
      loading: false,
      data: [],
      error: action.payload
    });
  case types.VOTE_COMMENTS_REQUEST:
    return Object.assign({}, prevState, {
      loading: true,
      data: [],
      error: null
    });
  case types.VOTE_COMMENTS_SUCCESS:
    const newState = Object.assign({}, prevState);
    const newData = newState.data.map((obj) => {
      if (obj._id === action.payload._id) {
        obj = action.payload;
        return obj;
      }
      return obj;
    });
    newState.data = newData;
    return newState;
  case types.VOTE_COMMENTS_FAILURE:
    return Object.assign({}, prevState, {
      loading: false,
      data: [],
      error: action.payload
    });
  case types.REMOVE_COMMENTS_REQUEST:
    return Object.assign({}, prevState, {
      loading: true,
      data: [],
      error: null
    });
  case types.REMOVE_COMMENTS_SUCCESS:
    const nuState = Object.assign({}, prevState);
    const index = nuState.data.map((obj, i) => {
      if (obj._id === action.payload._id) {
        return i;
      }
    });
    const nuData = nuState.data.slice(0, i).concat(nuState.data.slice(i+1));
    nuState.data = nuData;
    return nuState;
  case types.REMOVE_COMMENTS_FAILURE:
    return Object.assign({}, prevState, {
      loading: false,
      data: [],
      error: action.payload
    });
  default:
    return prevState;
  }
};