const mongodb = require("../db/connect");
const ObjectId = mongodb.ObjectId;

function getMongoDb(name) {
  return mongodb.getDb().db("frogforum").collection(name);
}

const getAllUsers = async (req, res) => {
  const result = await getMongoDb("users").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getOneUser = async (req, res) => {
  const result = await mongodb;
  getMongoDb("users").findOne({ _id: ObjectId(req.params.id) });
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
    email: req.body.email,
  };
  const result = await mongodb
  getMongoDb("users").insertOne(req.body);
  res.setHeader("Content-Type", "application/json");
  res.status(201).json(result);
};

const updateUser = async (req, res) => {
  const result = await mongodb
  getMongoDb("users").updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
};

const removeUser = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection("users")
    .deleteOne({ _id: ObjectId(req.params.id) });
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
