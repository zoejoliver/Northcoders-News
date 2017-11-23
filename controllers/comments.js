const {Comments} = require('../models/models');

function addCommentVote (req, res, next) {
    const upOrDown = req.query.vote;
    const vote = updateVoteCount(upOrDown);
    Comments.findOneAndUpdate({_id: req.params.comment_id}, { $inc: { votes: vote } }, { new: true })
    .then(() => {
        Comments.find({})
        .then((comments) => {
                res.send(comments);
            })
        })
    .catch((err) => {
        if (err.name === 'CastError')return next({err, type: 404})
        next(err);
    })
}

function removeComment (req, res, next) {
    Comments.findByIdAndRemove(req.params.comment_id)
    .then((deletedComment) => {
        res.send(deletedComment);
    })
    .catch((err) => {
        if (err.name === 'CastError') return next({type: 404, msg: 'Comment not found'});
        next(err);
    })
}

function updateVoteCount (vote) {
    if (vote === 'up') return 1;
    else if (vote === 'down') return -1;
}

module.exports = {addCommentVote, removeComment};