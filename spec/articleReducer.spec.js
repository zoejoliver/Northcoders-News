import {expect} from 'chai';
import articleReducer, {getInitialState} from '../src/reducers/articles';
import * as actionCreators from '../src/actions/articles';

describe('articleReducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = getInitialState();
      const action = {type: 'whatever'};
      const newState = articleReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = articleReducer(undefined, action);
      expect(newState).to.eql(getInitialState()); 
    });
  });
  describe('fetchArticles actions', () => {
    it('handles FETCH_ARTICLES_REQUEST', () => {
      const prevState = getInitialState();
      const action = actionCreators.fetchArticleRequest();
      const newState = articleReducer(prevState, action);
      expect(newState.loading).to.equal(true);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(null);
    });
    it('handles FETCH_ARTICLES_SUCCESS', () => {
      const data = [3,6,9,12];
      const prevState = getInitialState();
      const action = actionCreators.fetchArticleSuccess(data);
      const newState = articleReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql(data);
      expect(newState.error).to.equal(null);
    });
    it('handles FETCH_ARTICLES_FAILURE', () => {
      const err = 'something went wrong';
      const prevState = getInitialState();
      const action = actionCreators.fetchArticleFailure(err);
      const newState = articleReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(err);
    });
  });
})