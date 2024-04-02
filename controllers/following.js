const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllFollowing = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("frogforum")
      .collection("following")
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

const getOneFollowing = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("frogforum")
      .collection("following")
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

const createFollowing = async (req, res) => {
  const following = {
    userId: req.body.userId,
    following: req.body.following,
  };
  const result = await mongodb
    .getDb()
    .db("frogforum")
    .collection("following")
    .insertOne(following);
  res.setHeader("Content-Type", "application/json");
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(
        result.error || "An error occurred while trying to make following list"
      );
  }
};

const updateFollowing = async (req, res) => {
  const following = {
    userId: req.body.userId,
    following: req.body.following,
  };
  const result = await mongodb
    .getDb()
    .db("frogforum")
    .collection("following")
    .replaceOne({ userId: req.params.id }, following);
  console.log(result);
  res.setHeader("Content-Type", "application/json");
  if (result.modifiedCount > 0) {
    res.status(204).json(result);
  } else {
    res
      .status(400)
      .json(
        result.error || "An error occurred while trying to follow the user"
      );
  }
};

const removeFollowing = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db("frogforum")
    .collection("following")
    .deleteOne({ userId: req.params.id });
  res.setHeader("Content-Type", "application/json");
  if (result.deletedCount > 0) {
    res.status(202).json(result);
  } else {
    res
      .status(404)
      .json(
        result.error || "An error occurred while trying to unfollow the user"
      );
  }
};

module.exports = {
  getAllFollowing,
  getOneFollowing,
  createFollowing,
  updateFollowing,
  removeFollowing,
};
