const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

const getAllPost = async (req, res) => {
    const result = await mongodb.getDb().db().collection('followers').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getOnePost = async (req, res) => {
    const result = await mongodb.getDb().db().collection('followers').findOne({ _id: ObjectId(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
    }

const createPost = async (req, res) => {
    const result = await mongodb.getDb().db().collection('followers').insertOne(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(result);
  }

const updatePost = async (req, res) => {
    const result = await mongodb.getDb().db().collection('followers').updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  }

const removePost = async (req, res) => {
    const result = await mongodb.getDb().db().collection('followers').deleteOne({ _id: ObjectId(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  }

module.exports = {
    getAllPost,
    getOnePost,
    createPost,
    updatePost,
    removePost,
  };