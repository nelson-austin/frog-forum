
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllFollowers = async (req, res) => {
    const result = await mongodb.getDb().db('frogforum').collection('followers').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getOneFollowers = async (req, res) => {
    const result = await mongodb.getDb().db('frogforum').collection('followers').find({ userId: req.params.id });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
};

const createFollowers = async (req, res) => {
    const followers = {
      userId: req.body.userId,
      followers: req.body.followers
    }
    const result = await mongodb.getDb().db('frogforum').collection('followers').insertOne(followers);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(result);
  }

const updateFollowers = async (req, res) => {
  const followers = {
    userId: req.body.userId,
    followers: req.body.followers
  }
  const result = await mongodb.getDb().db('frogforum').collection('followers').replaceOne({ userId: req.params.id }, followers);
  console.log(result);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}

const removeFollowers = async (req, res) => {
  const result = await mongodb.getDb().db('frogforum').collection('followers').deleteOne({ userId: req.params.id });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
  }

module.exports = {
    getAllFollowers,
    getOneFollowers,
    createFollowers,
    updateFollowers,
    removeFollowers,
  };