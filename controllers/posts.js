const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const dbFunctions = require("./index");

const getAllPosts = async (req, res) => {
  try {
    const result = await dbFunctions
      .getMongoDb("posts")
      .find()
      .sort({ date: -1 });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (e) {
    console.log("error", e);
    res.setHeader("Content-Type", "application/json");
    res.status(404).json(JSON.stringify(e));
  }
};

const getAllPostsByAuthorId = async (req, res) => {
  try {
    const ids = req.params.ids.split(",");
    console.log(ids);
    const result = await dbFunctions
      .getMongoDb("posts")
      .find({ authorId: { $in: ids } })
      .sort({ date: -1 });
    result.toArray().then((lists) => {
      lists.sort((a, b) => b.date - a.date);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (e) {
    console.log("error", e);
    res.setHeader("Content-Type", "application/json");
    res.status(404).json(JSON.stringify(e));
  }
};

const getOnePost = async (req, res) => {
  try {
    const result = await dbFunctions
      .getMongoDb("posts")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (e) {
    console.log("error", e);
    res.setHeader("Content-Type", "application/json");
    res.status(404).json(JSON.stringify(e));
  }
};

const createPost = async (req, res) => {
  const post = {
    authorId: req.body.authorId,
    image: req.body.image,
    caption: req.body.caption,
    date: new Date(),
  };
  const result = await dbFunctions.getMongoDb("posts").insertOne(post);
  res.setHeader("Content-Type", "application/json");
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while trying to create a post");
  }
};

const updatePost = async (req, res) => {
  const post = {
    authorId: req.body.authorId,
    image: req.body.image,
    caption: req.body.caption,
    date: new Date(),
  };
  const result = await dbFunctions
    .getMongoDb("posts")
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: post });
  res.setHeader("Content-Type", "application/json");
  if (result.modifiedCount > 0) {
    res.status(204).json(result);
  } else {
    res
      .status(400)
      .json(
        result.error || "An error occurred while trying to update the post"
      );
  }
};

const removePost = async (req, res) => {
  const result = await dbFunctions
    .getMongoDb("posts")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.setHeader("Content-Type", "application/json");
  if (result.deletedCount > 0) {
    res.status(202).json(result);
  } else {
    res
      .status(404)
      .json(
        result.error || "An error occurred while trying to delete the post"
      );
  }
};

module.exports = {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  removePost,
  getAllPostsByAuthorId,
};
