const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genres');
const validation = require('../middleware/validate');

router.get('/', genresController.getAll);
router.get('/:id', genresController.getSingle);
router.post('/', validation.saveGenre, genresController.createGenre);
router.put('/:id', validation.saveGenre, genresController.updateGenre);
router.delete('/:id', genresController.deleteGenre);

module.exports = router;