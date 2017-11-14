const {Articles, Topics} = require('../models/models');

function getTopics (req, res, next) {
    Topics.find({})
    .then((topics) => {
        res.send(topics);
    })
    .catch((err) => {
        return next(err);
    })
}

function getArticlesByTopic (req, res, next) {
    Articles.find({belongs_to: req.params.topic_id})
    .then((articles) => {
        if(articles.length > 0) res.send(articles);
        else return next();
    })
    .catch((err) => {
        if(err.name === 'CastError') return next({err, type: 404});
    })
}

module.exports = {getTopics, getArticlesByTopic};