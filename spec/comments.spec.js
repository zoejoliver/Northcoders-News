import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
const API_URL = 'https://northcoders-news-zjo.herokuapp.com/api';

import {fetchComments, addComment, changeVote, removeComment, fetchCommentRequest, fetchCommentSuccess, fetchCommentFailure, postCommentRequest, postCommentSuccess, postCommentFailure, voteCommentRequest, voteCommentSuccess, voteCommentFailure} from '../src/actions/comments';

describe('Comment actions', () => {
    describe('fetchComments', () => {
        afterEach(() => {
          nock.cleanAll();
        });
        it('dispatches FETCH_COMMENTS_SUCCESS and responds with status code 200 and article comments', () => {
            const article_id = '5a13f64ad7681349fcb82bb1';
          nock(API_URL)
            .get(`/articles/${article_id}/comments`)
            .reply(200, [1,2,3]);
          
          const expectedActions = [
            fetchCommentRequest(),
            fetchCommentSuccess([1,2,3])
          ];
      
          const store = mockStore();
          return store.dispatch(fetchComments(article_id))
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
        it('dispatches FETCH_COMMENTS_FAILURE when responds with an error', () => {
            const article_id = '123'
          nock(API_URL)
            .get(`/articles/${article_id}/comments`)
            .replyWithError({'message': 'error'});
          
          const expectedActions = [
            fetchCommentRequest(),
            fetchCommentFailure('error')
          ];
      
          const store = mockStore();
          return store.dispatch(fetchComments(article_id))
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
    });
    describe('addComment', () => {
        afterEach(() => {
          nock.cleanAll();
        });
        it('dispatches POST_COMMENT_SUCCESS and responds with status code 200 and comments', () => {
            const article_id = '5a13f64ad7681349fcb82bb1';
            const comment = 'hello';
          nock(API_URL)
            .post(`/articles/${article_id}/comments`, {'comment': comment})
            .reply(200, [{
                body: comment, created_by: 'northcoder'
              }]);
          
          const expectedActions = [
            postCommentRequest(),
            postCommentSuccess([{body: comment, created_by: 'northcoder'}])
          ];
      
          const store = mockStore();
          return store.dispatch(addComment(article_id, comment))
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
        it('dispatches POST_COMMENT_FAILURE when responds with an error', () => {
            const article_id = '123';
            const comment = 'hello';
            const error = 'Invalid article ID'
          nock(API_URL)
            .post(`/articles/${article_id}/comments`, {'comment': comment})
            .replyWithError({'message': error});
          
          const expectedActions = [
            postCommentRequest(),
            postCommentFailure(error)
          ];
      
          const store = mockStore();
          return store.dispatch(addComment(article_id, comment))
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
    });
    describe('changeVote', () => {
        afterEach(() => {
          nock.cleanAll();
        });
        it('dispatches VOTE_COMMENT_SUCCESS and responds with status code 200 and comment', () => {
          const comment_id = '5a13f64ed7681349fcb82c43';
          const input = 'up';
          const item = 'comment';
          const article_id = '5a13f64ad7681349fcb82baf';
          nock(API_URL)
            .put(`/comments/${comment_id}?vote=${input}`, {'article_id': article_id})
            .reply(200, ['comment']);
          
          const expectedActions = [
            voteCommentRequest(),
            voteCommentSuccess(['comment'])
          ];
      
          const store = mockStore();
          return store.dispatch(changeVote(input, comment_id, item, article_id))
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
        it('dispatches VOTE_COMMENTS_FAILURE when responds with an error', () => {
            const error = 'Invalid comment ID'
            const comment_id = '123';
            const input = 'up';
            const item = 'comment';
            const article_id = '5a13f64ad7681349fcb82baf';
          nock(API_URL)
            .put(`/comments/${comment_id}?vote=${input}`, {'article_id': article_id})
            .replyWithError({'message': error});
          
          const expectedActions = [
            voteCommentRequest(),
            voteCommentFailure(error)
          ];
      
          const store = mockStore();
          return store.dispatch(changeVote(input, comment_id, item, article_id))
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
    });
})
