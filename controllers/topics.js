const {Articles, Comments, Topics, Users} = require('../models/models');

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
        else next();
    })
    .catch((err) => {
        return next(err);
    })
}

module.exports = {getTopics, getArticlesByTopic};