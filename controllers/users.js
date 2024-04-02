const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const dbFunctions = require("./index");

const getAllUsers = async (req, res) => {
  try {
    const result = await dbFunctions.getMongoDb("users").find();
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

const getOneUserByAuth0 = async (req, res) => {
  try {
    const result = await dbFunctions
      .getMongoDb("users")
      .findOne({ auth0Id: req.params.auth0id });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (e) {
    console.log("error", e);
    res.setHeader("Content-Type", "application/json");
    res.status(404).json(JSON.stringify(e));
  }
};

const getOneUser = async (req, res) => {
  try {
    const result = await dbFunctions
      .getMongoDb("users")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (e) {
    console.log("error", e);
    res.setHeader("Content-Type", "application/json");
    res.status(404).json(JSON.stringify(e));
  }
};

const createUser = async (req, res) => {
  const user = {
    auth0Id: req.body.auth0Id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    profilePicUrl: req.body.profilePicUrl,
    email: req.body.email,
  };
  const result = await dbFunctions.getMongoDb("users").insertOne(user);
  res.setHeader("Content-Type", "application/json");
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(
        result.error || "An error occurred while trying to create the user"
      );
  }
  res.status(201).json(result);
};

const updateUser = async (req, res) => {
  const result = await dbFunctions.getMongoDb("users").updateOne(
    {
      _id: new ObjectId(req.params.id),
    },
    { $set: req.body }
  );
  res.setHeader("Content-Type", "application/json");
  if (result.modifiedCount > 0) {
    res.status(204).json(result);
  } else {
    res
      .status(400)
      .json(
        result.error || "An error occurred while trying to update user info"
      );
  }
};

const removeUser = async (req, res) => {
  const result = await dbFunctions.getMongoDb("users").deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.setHeader("Content-Type", "application/json");
  if (result.deletedCount > 0) {
    res.status(202).json(result);
  } else {
    res
      .status(404)
      .json(
        result.error || "An error occurred while trying to delete the user"
      );
  }
};

module.exports = {
  getAllUsers,
  getOneUserByAuth0,
  getOneUser,
  createUser,
  updateUser,
  removeUser,
};
