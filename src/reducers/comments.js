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
  default:
    return prevState;
  }
};