const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');

router.get('/tmdb/movie/:id', moviesController.getMovieByIdFromTmdb);

module.exports = router;
