const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllFollowing = async (req, res) => {
    const result = await mongodb.getDb().db('frogforum').collection('following').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getOneFollowing = async (req, res) => {
  const result = await mongodb.getDb().db('frogforum').collection('following').find({ userId: req.params.id });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
}

const createFollowing = async (req, res) => {
    const following = {
      userId: req.body.userId,
      following: req.body.following
    }
    const result = await mongodb.getDb().db('frogforum').collection('following').insertOne(following);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(result);
  }

const updateFollowing = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid user id. Please try again.');
    }
    const userId = new ObjectId(req.params.id);
    const following = {
      userId: req.body.userId,
      following: req.body.following
    }
    const result = await mongodb.getDb().db('frogforum').collection('following').replaceOne({ _id: userId }, following);
    console.log(result);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  }

const removeFollowing = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Invalid user id. Please try again.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('frogforum').collection('following').deleteOne({ _id: userId });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}

module.exports = {
    getAllFollowing,
    getOneFollowing,
    createFollowing,
    updateFollowing,
    removeFollowing,
  };