const router = require("express").Router();
const followingController = require("../controllers/following");
const validation = require("../middleware/followingValidation");

router.get("/", followingController.getAllFollowing);

router.get("/:id", followingController.getOneFollowing);

router.post("/", validation.saveFollowing, followingController.createFollowing);

router.put("/:id", validation.saveFollowing, followingController.updateFollowing);

router.delete("/:id", followingController.removeFollowing);

module.exports = router;
