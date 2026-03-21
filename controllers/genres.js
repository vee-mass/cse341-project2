const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET all genres
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('genres').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single genre by ID
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid genre id to find a genre.');
    }
    const genreId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('genres').find({ _id: genreId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create new genre
const createGenre = async (req, res) => {
  try {
    const genre = {
      genreName: req.body.genreName,
      description: req.body.description
    };
    const response = await mongodb.getDb().db().collection('genres').insertOne(genre);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the genre.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update genre
const updateGenre = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid genre id to update a genre.');
    }
    const genreId = new ObjectId(req.params.id);
    const genre = {
      genreName: req.body.genreName,
      description: req.body.description
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('genres')
      .replaceOne({ _id: genreId }, genre);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the genre.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE genre
const deleteGenre = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid genre id to delete a genre.');
    }
    const genreId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('genres').deleteOne({ _id: genreId });
    
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the genre.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {getAll, getSingle, createGenre, updateGenre, deleteGenre};