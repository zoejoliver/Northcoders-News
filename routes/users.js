const router = require('express').Router();
const {getUserData} = require('../controllers/users');

router.route('/:username')
    .get(getUserData);

module.exports = router;