const express = require('express');
const router = express.Router();
const tvshowsController = require('../controllers/tv-shows');

router.get('/thetvdb/series', tvshowsController.getSeriesByIdFromTvDb);
router.get('/thetvdb/episode', tvshowsController.getEpisodeByIdFromTvDb);
router.get(
  '/thetvdb/series/:id/episodes',
  tvshowsController.getEpisodesBySeriesFromTvDb
);
router.get('/thetvdb/search/series', tvshowsController.searchSeriesFromTvDb);
router.get(
  '/thetvdb/series/:id/images',
  tvshowsController.getSeriesImagesByIdFromTvDb
);
router.get(
  '/thetvdb/series/:id/posters',
  tvshowsController.getSeriesPostersByIdFromTvDb
);

router.get(
  '/thetvdb/series/:id/seasonposters',
  tvshowsController.getSeriesSeasonPostersByIdFromTvDb
);

module.exports = router;
