const {Articles} = require('../models/models');

function getArticles (req, res, next) {
    Articles.find({})
    .then((articles) => {
        res.send(articles);
    })
    .catch((err) => {
        return next(err);
    })
}

function getCommentsById () {

}

function addCommentById () {

}

function addArticleVote () {

}

module.exports = {getArticles, getCommentsById, addCommentById, addArticleVote};