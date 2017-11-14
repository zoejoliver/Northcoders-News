const {Users} = require('../models/models');

function getUserData (req, res, next) {
    Users.find({username: req.params.username})
    .then((data) => {
        if(data.length > 0) res.send(data);
        else return next();
    })
    .catch((err) => {
        if(err.name === 'CastError') return next({err, type: 404});
    })
}

module.exports = {getUserData}