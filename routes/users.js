const router = require("express").Router();
const usersController = require("../controllers/users");
const validation = require("../middleware/userValidation");

router.get("/", usersController.getAllUsers);

router.get("/auth0/:auth0id", usersController.getOneUserByAuth0);

router.get("/:id", usersController.getOneUser);

router.post("/", validation.saveUser, usersController.createUser);

router.put("/:id", validation.saveUser, usersController.updateUser);

router.delete("/:id", usersController.removeUser);

module.exports = router;
