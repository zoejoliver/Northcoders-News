const {Comment} = require('../models');

function addCommentVote (req, res, next) {
    const upOrDown = req.query.vote;
    const vote = updateVoteCount(upOrDown);
    Comment.findOneAndUpdate({_id: req.params.comment_id}, { $inc: { votes: vote } }, { new: true })
    .then((comment) => {
        if (req.body.article === undefined) res.send(comment);
        else {
            Comment.find({belongs_to: req.body.article_id})
            .then((comments) => {
                res.send(comments);
            })
        }
    })
    .catch((err) => {
        if (err.name === 'CastError') return next({status: 404, message: 'Invalid comment ID'})
        next(err);
    })
}

function removeComment (req, res, next) {
    Comment.findByIdAndRemove(req.params.comment_id)
    .then(() => {
        Comment.find({belongs_to: req.query.article_id})
        .then((comments) => {
            res.send(comments);
        })
    })
    .catch((err) => {
        if (err.name === 'CastError') return next({status: 404, message: 'Comment not found'});
        next(err);
    })
}

function updateVoteCount (vote) {
    if (vote === 'up') return 1;
    else if (vote === 'down') return -1;
}

module.exports = {addCommentVote, removeComment};