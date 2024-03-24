const router = require('express').Router();

const followingController = require('../controllers/following');

router.get('/', followingController.getAllFollowing);

router.get('/:id', followingController.getOneFollowing);

router.post('/', followingController.createFollowing);

router.put('/:id', followingController.updateFollowing);

router.delete('/:id', followingController.removeFollowing);

module.exports = router;