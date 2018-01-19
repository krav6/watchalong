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
