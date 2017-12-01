const router = require('express').Router();
const {getArticles, getArticleComments, addCommentById, addArticleVote, getArticleById} = require('../controllers/articles');

router.route('/')
    .get(getArticles);
router.route('/:article_id')
    .get(getArticleById)
    .put(addArticleVote);
router.route('/:article_id/comments')
    .get(getArticleComments)
    .post(addCommentById);

module.exports = router;