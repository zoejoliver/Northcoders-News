import * as types from '../actions/types';

export const getInitialState = () => ({
  test: false,
});

export default (prevState = getInitialState(), action) => {
  switch (action.type) {
  case types.TOGGLE_TEST:
    return Object.assign({}, prevState, {
      test: !prevState.test
    });
  default:
    return prevState;
  }
};
