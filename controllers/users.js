const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const dbFunctions = require("./index");

const getAllUsers = async (req, res) => {
  const result = await dbFunctions.getMongoDb("users").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getOneUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await dbFunctions.getMongoDb("users").findOne({ _id: userId });
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
};

const createUser = async (req, res) => {
  const user = {
    givenName: req.body.givenName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    profilePicUrl: req.body.profilePicUrl,
    email: req.body.email
  };
  const result = await dbFunctions.getMongoDb("users").insertOne(user);
  res.setHeader("Content-Type", "application/json");
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
  res.status(200).json(result);
};

const removeUser = async (req, res) => {
  const result = await dbFunctions.getMongoDb("users").deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  removeUser,
};
