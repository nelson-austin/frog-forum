const router = require('express').Router();

const postsController = require('../controllers/posts');

router.get('/', postsController.getAllPost);

router.get('/:id', postsController.getOnePost);

router.post('/', postsController.createPost);

router.put('/:id', postsController.updatePost);

router.delete('/:id', postsController.removePost);

module.exports = router;