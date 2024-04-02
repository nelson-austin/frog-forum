const router = require("express").Router();
const postsController = require("../controllers/posts");
const validation = require("../middleware/postValidation");

router.get("/", postsController.getAllPosts);

//router.get('/:id', postsController.getOnePost);

router.get("/:ids", postsController.getAllPostsByAuthorId);

router.post("/", validation.savePost, postsController.createPost);

router.put("/:id", validation.savePost, postsController.updatePost);

router.delete("/:id", postsController.removePost);

module.exports = router;
