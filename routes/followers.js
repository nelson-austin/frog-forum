const router = require('express').Router();

const followersController = require('../controllers/followers');

router.get('/', followersController.getAllFollowers);

router.get('/:id', followersController.getOneFollowers);

router.post('/', followersController.createFollowers);

router.put('/:id', followersController.updateFollowers);

router.delete('/:id', followersController.removeFollowers);

module.exports = router;