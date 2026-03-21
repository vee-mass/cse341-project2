const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('authors').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('authors').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAuthor = async (req, res) => {
  try {
    const author = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      nationality: req.body.nationality,
      mostFamousWork: req.body.mostFamousWork,
      awardsCount: req.body.awardsCount,
      isActive: req.body.isActive
    };
    const response = await mongodb.getDb().db().collection('authors').insertOne(author);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the author.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid author id to update an author.');
    }
    const userId = new ObjectId(req.params.id);
    const author = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      nationality: req.body.nationality,
      mostFamousWork: req.body.mostFamousWork,
      awardsCount: req.body.awardsCount,
      isActive: req.body.isActive
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('authors')
      .replaceOne({ _id: userId }, author);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the author.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid author id to delete an author.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('authors').deleteOne({ _id: userId });
    
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the author.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {getAll, getSingle, createAuthor, updateAuthor, deleteAuthor };