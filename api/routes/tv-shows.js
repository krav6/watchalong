const express = require('express');
const router = express.Router();
const tvshowsController = require('../controllers/tv-shows');

router.get('/thetvdb/series', tvshowsController.getSeriesByIdFromTvDb);

module.exports = router;
