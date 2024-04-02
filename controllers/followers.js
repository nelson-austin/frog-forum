const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllFollowers = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("frogforum")
      .collection("followers")
      .find();
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

const getOneFollowers = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("frogforum")
      .collection("followers")
      .find({ userId: req.params.id });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (e) {
    console.log("error", e);
    res.setHeader("Content-Type", "application/json");
    res.status(404).json(JSON.stringify(e));
  }
};

const createFollowers = async (req, res) => {
  const followers = {
    userId: req.body.userId,
    followers: req.body.followers,
  };
  const result = await mongodb
    .getDb()
    .db("frogforum")
    .collection("followers")
    .insertOne(followers);
  res.setHeader("Content-Type", "application/json");
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(
        result.error ||
          "An error occurred while trying to create the followers list"
      );
  }
};

const updateFollowers = async (req, res) => {
  const followers = {
    userId: req.body.userId,
    followers: req.body.followers,
  };
  const result = await mongodb
    .getDb()
    .db("frogforum")
    .collection("followers")
    .replaceOne({ userId: req.params.id }, followers);
  console.log(result);
  res.setHeader("Content-Type", "application/json");
  if (result.modifiedCount > 0) {
    res.status(204).json(result);
  } else {
    res
      .status(400)
      .json(result.error || "An error occurred while trying to add follower");
  }
};

const removeFollowers = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db("frogforum")
    .collection("followers")
    .deleteOne({ userId: req.params.id });
  res.setHeader("Content-Type", "application/json");
  if (result.deletedCount > 0) {
    res.status(202).json(result);
  } else {
    res
      .status(404)
      .json(
        result.error || "An error occurred while trying to delete the follower"
      );
  }
};

module.exports = {
  getAllFollowers,
  getOneFollowers,
  createFollowers,
  updateFollowers,
  removeFollowers,
};
