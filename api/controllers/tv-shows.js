const thetvdbController = require('./externals/thetvdb');
const debug = require('debug')('controller:tv-shows');

exports.getSeriesByIdFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getSeriesById(req.query.id);
    return res.status(200).json(result);
  } catch (error) {
    res.sendStatus(503);
  }
};

exports.getEpisodeByIdFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getEpisodeById(req.query.id);
    return res.status(200).json(result);
  } catch (error) {
    res.sendStatus(503);
  }
};

exports.getEpisodesBySeriesFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getEpisodesBySeries(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    res.sendStatus(503);
  }
};

exports.searchSeriesFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.searchSeries(req.query);
    return res.status(200).json(result);
  } catch (error) {
    res.sendStatus(503);
  }
};
