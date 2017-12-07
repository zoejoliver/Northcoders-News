const {Article, Topic, Comment} = require('../models');

function getTopics (req, res, next) {
    Topic.find({})
    .then((topics) => {
        res.send(topics);
    })
    .catch((err) => {
        next(err);
    })
}

function getArticlesByTopic (req, res, next) {
    Article.find({belongs_to: req.params.topic_id})
    .then((articles) => {
        if (articles.length === 0) return next({status: 404, message: 'Invalid topic ID'})
        Promise.all(getCommentCount(articles))
        .then((commentCount) => {
            const updatedArticles = addCommentCount(articles, commentCount);
            res.send(updatedArticles);
        })
    })
    .catch((err) => {
        next(err);
    })
}

function getCommentCount (arr) {
    return arr.map((article) => {
        return Comment.count({belongs_to: article._id})
    })
}
function addCommentCount (arr, count) {
    return arr.map((article, i) => {
        article = article.toObject();
        article.comments = count[i];
        return article;
    })
}
module.exports = {getTopics, getArticlesByTopic};