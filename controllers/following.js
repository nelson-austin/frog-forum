const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

const getAllFollowing = async (req, res) => {
    const result = await mongodb.getDb().db().collection('followers').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getOneFollowing = async (req, res) => {
    const result = await mongodb.getDb().db().collection('followers').findOne({ _id: ObjectId(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
    }

const createFollowing = async (req, res) => {
    const result = await mongodb.getDb().db().collection('followers').insertOne(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(result);
  }

const updateFollowing = async (req, res) => {
    const result = await mongodb.getDb().db().collection('followers').updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  }

const removeFollowing = async (req, res) => {
    const result = await mongodb.getDb().db().collection('followers').deleteOne({ _id: ObjectId(req.params.id) });
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