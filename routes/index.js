const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/authors', require('./authors'));
router.use('/genres', require('./genres')); 

module.exports = router;