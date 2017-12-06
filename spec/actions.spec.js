import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
const API_URL = 'https://northcoders-news-zjo.herokuapp.com/api';

import {fetchArticles, getMostPopular, fetchArticlesByTopic, fetchArticleById, changeVote, fetchArticleRequest, fetchArticleSuccess, fetchArticleFailure, fetchOneArticleRequest, fetchOneArticleSuccess, fetchOneArticleFailure, voteArticleRequest, voteArticleSuccess, voteArticleFailure} from '../src/actions/articles';
describe('Article actions', () => {
    describe('fetchArticles', () => {
        afterEach(() => {
          nock.cleanAll();
        });
        it('dispatches FETCH_ARTICLES_SUCCESS and responds with status code 200 and all articles', () => {
          nock(API_URL)
            .get(`/articles`)
            .reply(200, [1,2,3]);
          
          const expectedActions = [
            fetchArticleRequest(),
            fetchArticleSuccess([1,2,3])
          ];
      
          const store = mockStore();
          return store.dispatch(fetchArticles())
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
        it('dispatches FETCH_ARTICLES_FAILURE when responds with an error', () => {
          nock(API_URL)
            .get(`/articles`)
            .replyWithError({'message': 'error'});
          
          const expectedActions = [
            fetchArticleRequest(),
            fetchArticleFailure('error')
          ];
      
          const store = mockStore();
          return store.dispatch(fetchArticles())
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
    });
    describe('getMostPopular', () => {
        afterEach(() => {
          nock.cleanAll();
        });
        it('dispatches FETCH_ARTICLES_SUCCESS and responds with status code 200 and articles', () => {
          nock(API_URL)
            .get(`/articles`)
            .reply(200, [1,2,3]);
          
          const expectedActions = [
            fetchArticleRequest(),
            fetchArticleSuccess([1,2,3])
          ];
      
          const store = mockStore();
          return store.dispatch(fetchArticles())
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
        it('dispatches FETCH_ARTICLES_FAILURE when responds with an error', () => {
          nock(API_URL)
            .get(`/articles`)
            .replyWithError({'message': 'error'});
          
          const expectedActions = [
            fetchArticleRequest(),
            fetchArticleFailure('error')
          ];
      
          const store = mockStore();
          return store.dispatch(getMostPopular())
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
    });
    describe('fetchArticlesByTopic', () => {
        afterEach(() => {
          nock.cleanAll();
        });
        it('dispatches FETCH_ARTICLES_SUCCESS and responds with status code 200 and articles', () => {
          const topic = 'coding';
          nock(API_URL)
            .get(`/topics/${topic}/articles`)
            .reply(200, [1,2,3]);
          
          const expectedActions = [
            fetchArticleRequest(),
            fetchArticleSuccess([1,2,3])
          ];
      
          const store = mockStore();
          return store.dispatch(fetchArticlesByTopic(topic))
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
        it('dispatches FETCH_ARTICLES_FAILURE when responds with an error', () => {
            const error = 'Topic not Found'
            const topic = 'blue';
          nock(API_URL)
            .get(`/topics/${topic}/articles`)
            .replyWithError({'message': error});
          
          const expectedActions = [
            fetchArticleRequest(),
            fetchArticleFailure(error)
          ];
      
          const store = mockStore();
          return store.dispatch(fetchArticlesByTopic(topic))
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
    });
    describe('fetchArticlesById', () => {
        afterEach(() => {
          nock.cleanAll();
        });
        it('dispatches FETCH_ONE_ARTICLE_SUCCESS and responds with status code 200 and correct article', () => {
          const article_id = '5a13f64ad7681349fcb82bb1';
          nock(API_URL)
            .get(`/articles/${article_id}`)
            .reply(200, ['article']);
          
          const expectedActions = [
            fetchOneArticleRequest(),
            fetchOneArticleSuccess(['article'])
          ];
      
          const store = mockStore();
          return store.dispatch(fetchArticleById(article_id))
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
        it('dispatches FETCH_ONE_ARTICLE_FAILURE when responds with an error', () => {
            const error = 'Invalid article ID'
            const article_id = '123';
          nock(API_URL)
            .get(`/articles/${article_id}`)
            .replyWithError({'message': error});
          
          const expectedActions = [
            fetchOneArticleRequest(),
            fetchOneArticleFailure(error)
          ];
      
          const store = mockStore();
          return store.dispatch(fetchArticleById(article_id))
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
    });
    describe('changeVote', () => {
        afterEach(() => {
          nock.cleanAll();
        });
        it('dispatches VOTE_ARTICLE_SUCCESS and responds with status code 200 and article', () => {
          const article_id = '5a13f64ad7681349fcb82bb1';
          const input = 'up';
          const item = 'article';
          nock(API_URL)
            .put(`/articles/${article_id}?vote=${input}`)
            .reply(200, ['article']);
          
          const expectedActions = [
            voteArticleRequest(),
            voteArticleSuccess(['article'])
          ];
      
          const store = mockStore();
          return store.dispatch(changeVote(input, article_id, item))
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
        it('dispatches VOTE_ARTICLES_FAILURE when responds with an error', () => {
            const error = 'Invalid article ID'
            const article_id = '123';
            const input = 'up';
            const item = 'article';
          nock(API_URL)
            .put(`/articles/${article_id}?vote=${input}`)
            .replyWithError({'message': error});
          
          const expectedActions = [
            voteArticleRequest(),
            voteArticleFailure(error)
          ];
      
          const store = mockStore();
          return store.dispatch(changeVote(input, article_id, item))
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
    });
})
