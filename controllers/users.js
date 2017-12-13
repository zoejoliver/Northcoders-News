const {User} = require('../models');

function getUserData (req, res, next) {
    User.find({username: req.params.username})
    .then((data) => {
        if (data.length === 0) return next({status: 404})
        else res.send(data);
    })
    .catch((err) => {
        if (err.name === 'CastError') return next({status: 400, message: 'Invalid username'})
        next(err);
    })
}

module.exports = {getUserData}