import * as types from './types';
import axios from 'axios';
import {API_URL} from './index';

export const fetchArticleRequest = () => ({
  type: types.FETCH_ARTICLES_REQUEST
});

export const fetchArticleSuccess = (data) => ({
  type: types.FETCH_ARTICLES_SUCCESS,
  payload: data
});

export const fetchArticleFailure = (error) => ({
  type: types.FETCH_ARTICLES_FAILURE,
  payload: error
});

export const fetchOneArticleRequest = () => ({
  type: types.FETCH_ONE_ARTICLES_REQUEST
});

export const fetchOneArticleSuccess = (data) => ({
  type: types.FETCH_ONE_ARTICLES_SUCCESS,
  payload: data
});

export const fetchOneArticleFailure = (error) => ({
  type: types.FETCH_ONE_ARTICLES_FAILURE,
  payload: error
});

export const voteArticleRequest = () => ({
  type: types.VOTE_ARTICLES_REQUEST
});
  
export const voteArticleSuccess = (data) => ({
  type: types.VOTE_ARTICLES_SUCCESS,
  payload: data
});

export const voteArticleFailure = (error) => ({
  type: types.VOTE_ARTICLES_FAILURE,
  payload: error
});

export const fetchArticles = () => {
  return (dispatch) => {
    dispatch(fetchArticleRequest());
    return axios.get(`${API_URL}/articles`)
      .then((res) => {
        dispatch(fetchArticleSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchArticleFailure(error.message));
      });
  };
};

export const getMostPopular = () => {
  return (dispatch) => {
    dispatch(fetchArticleRequest());
    return axios.get(`${API_URL}/articles`)
      .then((res) => {
        return res.data.sort((a, b) => {
          return b.votes - a.votes;
        });
      })
      .then((result) => {
        dispatch(fetchArticleSuccess(result));
      })
      .catch((error) => {
        dispatch(fetchArticleFailure(error.message));
      });
  };
};

export const fetchArticlesByTopic = (topic) => {
  return (dispatch) => {
    dispatch(fetchArticleRequest());
    return axios.get(`${API_URL}/topics/${topic}/articles`)
      .then((res) => {
        dispatch(fetchArticleSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchArticleFailure(error.message));
      });
  };
};

export const fetchArticleById = (id) => {
  return (dispatch) => {
    dispatch(fetchOneArticleRequest());
    return axios.get(`${API_URL}/articles/${id}`)
      .then((res) => {
        dispatch(fetchOneArticleSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchOneArticleFailure(error.message));
      });
  };
};

export const changeVote = (input, id, item) => {
  let mode;
  if (item === 'article') {
    mode = 'articles';
    return (dispatch) => {
      dispatch(voteArticleRequest());
      return axios.put(`${API_URL}/${mode}/${id}?vote=${input}`)
        .then((res) => {
          dispatch(voteArticleSuccess(res.data));
        })
        .catch((error) => {
          dispatch(voteArticleFailure(error.message));
        });
    };
  }  
};
