import * as types from './types';
import axios from 'axios';
const API_URL = 'https://northcoders-news-zjo.herokuapp.com/api';

export const toggleTest = () => ({
  type: types.TOGGLE_TEST
});
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

export const fetchCommentRequest = () => ({
  type: types.FETCH_COMMENTS_REQUEST
});

export const fetchCommentSuccess = (data) => ({
  type: types.FETCH_COMMENTS_SUCCESS,
  payload: data
});

export const fetchCommentFailure = (error) => ({
  type: types.FETCH_COMMENTS_FAILURE,
  payload: error
});

export default () => {
  return (dispatch) => {
    dispatch(fetchArticleRequest);
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
    dispatch(fetchArticleRequest);
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
    dispatch(fetchArticleRequest);
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
    dispatch(fetchArticleRequest);
    return axios.get(`${API_URL}/articles`)
      .then((res) => {
        return res.data.filter((article) => {
          return article._id === id;
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

export const fetchComments = (id) => {
  return (dispatch) => {
    dispatch(fetchCommentRequest);
    return axios.get(`${API_URL}/articles/${id}/comments`)
      .then((res) => {
        dispatch(fetchCommentSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchCommentFailure(error.message));
      });
  };
};