const {Comments} = require('../models/models');

function addCommentVote (req, res, next) {
    const upOrDown = req.query.vote;
    const vote = updateVoteCount(upOrDown);
    Comments.findOneAndUpdate({_id: req.params.comment_id}, { $inc: { votes: vote } }, { new: true })
    .then((comment) => {
        res.send(comment);
    })
    .catch((err) => {
        if (err.name === 'CastError')return next({err, type: 404})
        return next(err);
    })
}

function removeComment () {
    
}

function updateVoteCount (vote) {
    if (vote === 'up') return 1;
    else if (vote === 'down') return -1;
}

module.exports = {addCommentVote, removeComment};