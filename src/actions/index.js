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

export const postCommentRequest = () => ({
  type: types.POST_COMMENTS_REQUEST
});

export const postCommentSuccess = (data) => ({
  type: types.POST_COMMENTS_SUCCESS,
  payload: data
});

export const postCommentFailure = (error) => ({
  type: types.POST_COMMENTS_FAILURE,
  payload: error
});

export const voteCommentRequest = () => ({
  type: types.VOTE_COMMENTS_REQUEST
});

export const voteCommentSuccess = (data) => ({
  type: types.VOTE_COMMENTS_SUCCESS,
  payload: data
});

export const voteCommentFailure = (error) => ({
  type: types.VOTE_COMMENTS_FAILURE,
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

export const addComment = (id, comment) => {
  return (dispatch) => {
    dispatch(postCommentRequest);
    return axios.post(`${API_URL}/articles/${id}/comments`, {'comment': comment})
      .then((res) => {
        console.log('comment added');
        dispatch(postCommentSuccess(res.data));
      })
      .catch((error) => {
        dispatch(postCommentFailure(error.message));
      });
  };
};

export const changeVote = (vote, id, item) => {
  let mode = 'articles';
  if (item === 'comment') mode = 'comments';
  return (dispatch) => {
    dispatch(voteCommentRequest);
    return axios.put(`${API_URL}/${mode}/${id}`, {'input': vote})
      .then((res) => {
        console.log('vote added');
        dispatch(voteCommentSuccess(res.data));
      })
      .catch((error) => {
        dispatch(voteCommentFailure(error.message));
      });
  };
};