const router = require("express").Router();
const followersController = require("../controllers/followers");
const validation = require("../middleware/followerValidation");

router.get("/", followersController.getAllFollowers);

router.get("/:id", followersController.getOneFollowers);

router.post("/", validation.saveFollower, followersController.createFollowers);

router.put(
  "/:id",
  validation.saveFollower,
  followersController.updateFollowers
);

router.delete("/:id", followersController.removeFollowers);

module.exports = router;
