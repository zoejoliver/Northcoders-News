const {Articles, Topics, Comments} = require('../models/models');

function getTopics (req, res, next) {
    Topics.find({})
    .then((topics) => {
        res.send(topics);
    })
    .catch((err) => {
        next(err);
    })
}

function getArticlesByTopic (req, res, next) {
    Articles.find({belongs_to: req.params.topic_id})
    .then((articles) => {
        if(articles.length < 1) return next();
        Promise.all(getCommentCount(articles))
        .then((commentCount) => {
            const updatedArticles = addCommentCount(articles, commentCount);
            res.send(updatedArticles);
        })
    })
    .catch((err) => {
        if (err.name === 'CastError')return next({err, type: 404, msg: 'Invalid topic Id'})
        next(err);
    })
}

function getCommentCount (arr) {
    return arr.map((article) => {
        return Comments.count({belongs_to: article._id})
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