const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genres');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate'); 

router.get('/', genresController.getAll);
router.get('/:id', genresController.getSingle);

// PROTECTED ROUTES
router.post('/', isAuthenticated, validation.saveGenre, genresController.createGenre);
router.put('/:id', isAuthenticated, validation.saveGenre, genresController.updateGenre);
router.delete('/:id', isAuthenticated, genresController.deleteGenre);

module.exports = router;