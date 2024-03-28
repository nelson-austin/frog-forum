const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const dbFunctions = require("./index");

const getAllPosts = async (req, res) => {
  const result = await dbFunctions.getMongoDb("posts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getAllPostsByAuthorId = async(req, res) => {
  const ids = req.params.followers.split(',');
  const result = await dbFunctions.getMongoDb("posts").findAll({ authorId: {$in: ids} }).toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
}

const getOnePost = async (req, res) => {
  const result = await dbFunctions
    .getMongoDb("posts")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
};

const createPost = async (req, res) => {
  const post = {
    authorId: req.body.authorId,
    image: req.body.image,
    caption: req.body.caption,
    date: req.body.date
  };
  const result = await dbFunctions.getMongoDb("posts").insertOne(post);
  res.setHeader("Content-Type", "application/json");
  res.status(201).json(result);
};

const updatePost = async (req, res) => {
  const result = await dbFunctions
    .getMongoDb("posts")
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
};

const removePost = async (req, res) => {
  const result = await dbFunctions
    .getMongoDb("posts")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
};

module.exports = {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  removePost,
  getAllPostsByAuthorId
};
