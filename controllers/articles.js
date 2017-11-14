const {Articles, Comments} = require('../models/models');

function getArticles (req, res, next) {
    Articles.find({})
    .then((articles) => {
        res.send(articles);
    })
    .catch((err) => {
        return next(err);
    })
}

function getArticleComments (req, res, next) {
    Comments.find({created_by: req.params.article_id})
    .then((comments) => {
        if(comments.length > 0) res.send(comments);
        else return next();
    })
    .catch((err) => {
        if(err.name === 'CastError') return next({err, type: 404});
    })
}

function addCommentById (req, res, next) {
    Comments.update({
        body: 'new comment',
        belongs_to: req.params.article_id,
        created_by: 'me',
        votes: 0,
        created_at: Date.now()
    })
    // also maybe save the new comments
    // currently not updating db
    .then(() => {
        return Comments.find({})
        .then((comments) => {
            res.send(comments);
        })
    })
    .catch((err) => {
        if(err.name === 'CastError') return next({err, type: 404});
    })
}

function addArticleVote () {

}

module.exports = {getArticles, getArticleComments, addCommentById, addArticleVote};