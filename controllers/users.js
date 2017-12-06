const {Users} = require('../models');

function getUserData (req, res, next) {
    Users.find({username: req.params.username})
    .then((data) => {
        if (data.length === 0) return next({status: 404, message: 'Invalid username'})
        else res.send(data);
    })
    .catch((err) => {
        next(err);
    })
}

module.exports = {getUserData}