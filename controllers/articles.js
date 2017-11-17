const {Articles, Comments} = require('../models/models');

function getArticles (req, res, next) {
    Articles.find({})
    .then((articles) => {
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

function getArticleComments (req, res, next) {
    Comments.find({belongs_to: req.params.article_id})
    .then((comments) => {
        if(comments.length < 1) return next();
        res.send(comments);
        
    })
    .catch((err) => {
        if (err.name === 'CastError')return next({err, type: 404, msg: 'Invalid article Id'})
        next(err);
    })
}

function addCommentById (req, res, next) {
    Comments.update({
        body: req.body.comment,
        belongs_to: req.params.article_id,
        created_by: 'northcoder',
        votes: 0,
        created_at: Date.now()
    })
    .then(() => {
        return Comments.find({})
        .then((comments) => {
            res.send(comments);
        })
    })
    .catch((err) => {
        next(err);
    })
}

function addArticleVote (req, res, next) {
    const upOrDown = req.query.vote;
    const vote = updateVoteCount(upOrDown);
    Articles.findOneAndUpdate({_id:req.params.article_id}, { $inc: { votes: vote } }, { new: true })
    .then((article) => {
        res.send(article);    
    })
    .catch((err) => {
        next(err);
    })
}

function updateVoteCount (vote) {
    if (vote === 'up') return 1;
    else if (vote === 'down') return -1;
}

module.exports = {getArticles, getArticleComments, addCommentById, addArticleVote};