import {expect} from 'chai';
import commentReducer, {getInitialState} from '../src/reducers/comments';
import * as actionCreators from '../src/actions/comments';

describe('commentReducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = getInitialState();
      const action = {type: 'whatever'};
      const newState = commentReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = commentReducer(undefined, action);
      expect(newState).to.eql(getInitialState()); 
    });
  });
  describe('fetchComments actions', () => {
    it('handles FETCH_COMMENTS_REQUEST', () => {
      const prevState = getInitialState();
      const action = actionCreators.fetchCommentRequest();
      const newState = commentReducer(prevState, action);
      expect(newState.loading).to.equal(true);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(null);
    });
    it('handles FETCH_COMMENTS_SUCCESS', () => {
      const data = [3,6,9,12];
      const prevState = getInitialState();
      const action = actionCreators.fetchCommentSuccess(data);
      const newState = commentReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql(data);
      expect(newState.error).to.equal(null);
    });
    it('should not mutate previous state', () => {
      const data = [3,6,9,12];
      const prevState = getInitialState();
      const action = actionCreators.fetchCommentSuccess(data);
      const newState = commentReducer(prevState, action);
      expect(newState).to.not.equal(prevState);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles FETCH_COMMENTS_FAILURE', () => {
      const err = 'something went wrong';
      const prevState = getInitialState();
      const action = actionCreators.fetchCommentFailure(err);
      const newState = commentReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(err);
    });
  });
  describe('addComment actions', () => {
    const id = '5a13f64ad7681349fcb82bbe';
    const comment = 'hello';
    it('handles POST_COMMENTS_REQUEST', () => {
      const prevState = getInitialState();
      const action = actionCreators.postCommentRequest(id, comment);
      const newState = commentReducer(prevState, action);
      expect(newState.loading).to.equal(true);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(null);
    });
    it('handles POST_COMMENTS_SUCCESS', () => {
      const data = [{body: 'hello'}];
      const prevState = getInitialState();
      const action = actionCreators.postCommentSuccess(data);
      const newState = commentReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql(data);
      expect(newState.error).to.equal(null);
    });
    it('should not mutate previous state', () => {
      const data = [{body: 'hello'}];
      const prevState = getInitialState();
      const action = actionCreators.postCommentSuccess(data);
      const newState = commentReducer(prevState, action);
      expect(newState).to.not.equal(prevState);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles POST_COMMENTS_FAILURE', () => {
      const err = 'something went wrong';
      const prevState = getInitialState();
      const action = actionCreators.postCommentFailure(err);
      const newState = commentReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(err);
    });
  });
  describe('changeVote actions', () => {
    it('handles POST_COMMENTS_REQUEST', () => {
      const prevState = getInitialState();
      const action = actionCreators.voteCommentRequest();
      const newState = commentReducer(prevState, action);
      expect(newState.loading).to.equal(true);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(null);
    });
    it('handles VOTE_COMMENTS_SUCCESS', () => {
      const data = [1,2,3];
      const prevState = getInitialState();
      const action = actionCreators.voteCommentSuccess(data);
      const newState = commentReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql(data);
      expect(newState.error).to.equal(null);
    });
    it('should not mutate previous state', () => {
      const data = [1,2,3]
      const prevState = getInitialState();
      const action = actionCreators.voteCommentSuccess(data);
      const newState = commentReducer(prevState, action);
      expect(newState).to.not.equal(prevState);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles VOTE_COMMENTS_FAILURE', () => {
      const err = 'something went wrong';
      const prevState = getInitialState();
      const action = actionCreators.voteCommentFailure(err);
      const newState = commentReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(err);
    });
  });
  describe('removeComment actions', () => {
    it('handles REMOVE_COMMENTS_REQUEST', () => {
      const prevState = getInitialState();
      const action = actionCreators.removeCommentRequest();
      const newState = commentReducer(prevState, action);
      expect(newState.loading).to.equal(true);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(null);
    });
    it('handles REMOVE_COMMENTS_SUCCESS', () => {
      const data = [1,2,3];
      const prevState = getInitialState();
      const action = actionCreators.removeCommentSuccess(data);
      const newState = commentReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql(data);
      expect(newState.error).to.equal(null);
    });
    it('should not mutate previous state', () => {
      const data = [1,2,3]
      const prevState = getInitialState();
      const action = actionCreators.removeCommentSuccess(data);
      const newState = commentReducer(prevState, action);
      expect(newState).to.not.equal(prevState);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles REMOVE_COMMENTS_FAILURE', () => {
      const err = 'something went wrong';
      const prevState = getInitialState();
      const action = actionCreators.removeCommentFailure(err);
      const newState = commentReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(err);
    });
  });
})