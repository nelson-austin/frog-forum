const router = require('express').Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getAllUsers);

router.get('/:auth0id', usersController.getOneUser);

router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.removeUser);

module.exports = router;