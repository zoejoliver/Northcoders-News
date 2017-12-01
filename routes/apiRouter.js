const router = require('express').Router();
const topics = require('./topics');
const articles = require('./articles');
const comments = require('./comments');
const users = require('./users');


router.route('/')
.get((req, res) => {
    res.status(200).send({status: 'OK'});
});
router.use('/topics', topics);
router.use('/articles', articles);
router.use('/comments', comments);
router.use('/users', users);

module.exports = router;