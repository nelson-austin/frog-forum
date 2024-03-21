const router = require('express').Router();

router.use('/', require('./swagger'));
// router.use('/posts', require('./posts'));
// router.use('/users', require('./users'));
// router.use('/followers', require('./followers'));
// router.use('/following', require('./following'));

module.exports = router;