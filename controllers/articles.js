const {Article, Comment} = require('../models');

function getArticles (req, res, next) {
    Article.find({})
    .then((articles) => {
        Promise.all(getCommentCount(articles))
        .then((commentCount) => {
            const updatedArticles = addCommentCount(articles, commentCount);
            res.send(updatedArticles);
        })
    })
    .catch((err) => {
        return next(err);
    })
}

function getArticleById (req, res, next) {
    Article.find({_id: req.params.article_id})
    .then((article) => {
        if (article.length === 0) return next({status: 404});
        Promise.all(getCommentCount(article))
        .then((commentCount) => {
            const updatedArticles = addCommentCount(article, commentCount);
            res.send(updatedArticles);
        })
    })
    .catch((err) => {
        if (err.name === 'CastError') return next({status: 400, message: 'Invalid article ID'});
        return next(err);
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

function getArticleComments (req, res, next) {
    Comment.find({belongs_to: req.params.article_id})
    .then((comments) => {
        if (comments.length === 0) return next({status: 404});
        res.send(comments);
    })
    .catch((err) => {
        if (err.name === 'CastError') return next({status: 400, message: 'Invalid article ID'})
        return next(err);
    })
}

function addCommentById (req, res, next) {
    if (req.body.comment === undefined) req.body.comment = 'new comment';
    let newComment = {
        body: req.body.comment,
        belongs_to: req.params.article_id,
        created_by: 'northcoder',
        votes: 0,
        created_at: Date.now()
    }
    Comment.create([newComment])
    .then(() => {
        return Comment.find({})
        .then((comments) => {
            res.send(comments);
        })
    })
    .catch((err) => {
        return next(err);
    })
}

function addArticleVote (req, res, next) {
    const upOrDown = req.query.vote;
    const vote = updateVoteCount(upOrDown);
    Article.findOneAndUpdate({_id:req.params.article_id}, { $inc: { votes: vote } }, { new: true })
    .then((article) => {
        if (article.length === 0) return next({status: 400});
        if (article.belongs_to === 'cats') {
            res.send(article)
        }
        else {
            const articleArr = [article]
            Promise.all(getCommentCount(articleArr))
            .then((commentCount) => {
                const updatedArticles = addCommentCount(articleArr, commentCount);
                res.send(updatedArticles);
            })   
        }
    })
    .catch((err) => {
        if (err.name === 'CastError') return next({status: 400, message: 'Invalid article ID'})
        return next(err);
    })
}

function updateVoteCount (vote) {
    if (vote === 'up') return 1;
    else if (vote === 'down') return -1;
}

module.exports = {getArticles, getArticleComments, addCommentById, addArticleVote, getArticleById};