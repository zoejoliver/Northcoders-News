const {Articles, Comments, Topics, Users} = require('../models/models');

function getTopics (req, res, next) {
    Topics.find({})
    .then((topics) => {
        res.send(topics);
    })
    .catch((err) => {
        if (err.name === 'CastError') return next({err, type: 404})
    })
}

function getArticleById (req, res, next) {

    })
}

module.exports = {getTopics, getArticleById};