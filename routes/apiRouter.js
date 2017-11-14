const router = require('express').Router();
const {getTopics, getArticlesByTopic} = require('../controllers/topics');
const {getArticles, getArticleComments, addCommentById, addArticleVote} = require('../controllers/articles');
const {addCommentVote, removeComment} = require('../controllers/comments');
const {getUserData} = require('../controllers/users');

router.get('/topics', getTopics);
router.get('/topics/:topic_id/articles', getArticlesByTopic);
router.get('/articles', getArticles);
router.get('/articles/:article_id/comments', getArticleComments);
router.post('/articles/:article_id/comments', addCommentById);
router.put('/articles/:article_id', addArticleVote);
router.put('/comments/:comment_id', addCommentVote);
router.delete('/comments/:comment_id', removeComment);
router.get('/users/:username', getUserData);

module.exports = router;