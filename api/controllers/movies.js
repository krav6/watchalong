const tmdbController = require('./externals/tmdb');
const debug = require('debug')('controller:movies');

exports.getMovieByIdFromTmdb = async (req, res) => {
  try {
    const movie = await tmdbController.getMovieById(req.params.id);
    return res.status(200).json(JSON.parse(movie));
  } catch (error) {
    res.sendStatus(503);
  }
};
