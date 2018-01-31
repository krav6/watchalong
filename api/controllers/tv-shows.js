const thetvdbController = require('./externals/thetvdb');
const debug = require('debug')('controller:tv-shows');
const tvShowModel = require('../models/tv-show');
const episodeModel = require('../models/episode');

exports.getSeriesByIdFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getSeriesById(req.params.id);
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

exports.getEpisodeByIdFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getEpisodeById(req.params.id);
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

exports.getEpisodesBySeriesFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getEpisodesBySeries(req.params.id);
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

exports.searchSeriesFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.searchSeries(req.query);
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

exports.getSeriesImagesByIdFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getSeriesImagesById(req.params.id);
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

exports.getSeriesPostersByIdFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getSeriesPostersById(req.params.id);
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

exports.getSeriesSeasonPostersByIdFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getSeriesSeasonPostersById(
      req.params.id
    );
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const isSeriesAlreadyExists = async id => {
  try {
    const isShowExists = await tvShowModel.exists(id);
    return isShowExists;
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: 'An error occured while fetching series data from the database.'
    });
  }
};

const checkInsertSeriesRequest = async id => {
  const isSeriesIdMissing = 'undefined' == typeof id || 0 == id.length;
  if (isSeriesIdMissing) {
    return Promise.reject({
      status: 403,
      message: 'Missing field: id'
    });
  }

  const isSeriesExists = await isSeriesAlreadyExists(id);
  if (isSeriesExists) {
    return Promise.reject({
      status: 403,
      message: `Series with the id of ${id} is already stored in the database.`
    });
  }
};

const calculateNumberOfSeasons = episodes => {
  return Math.max.apply(
    Math,
    episodes.map(element => {
      return element.airedSeason;
    })
  );
};

const insertSeries = async (seriesId, seriesData, numberOfSeasons) => {
  try {
    return await tvShowModel.insert(
      seriesId,
      seriesData.seriesName,
      seriesData.firstAired.length == 0 ? null : seriesData.firstAired,
      seriesData.overview,
      seriesData.runtime,
      numberOfSeasons
    );
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: 'An error occured while inserting series data from the database.'
    });
  }
};

const insertEpisodes = async (seriesId, episodeData) => {
  try {
    for (let index = 0; index < episodeData.length; index++) {
      await episodeModel.insert(
        seriesId,
        episodeData[index].airedSeason,
        episodeData[index].airedEpisodeNumber,
        episodeData[index].episodeName,
        episodeData[index].firstAired.length == 0
          ? null
          : episodeData[index].firstAired,
        episodeData[index].overview
      );
    }
  } catch (error) {
    return Promise.reject({
      status: 500,
      message:
        'An error occured while inserting episode data from the database.'
    });
  }
};

const getParsedSeries = async seriesId => {
  return JSON.parse(await thetvdbController.getSeriesById(seriesId));
};

const getParsedEpisodes = async seriesId => {
  return JSON.parse(await thetvdbController.getEpisodesBySeries(seriesId));
};

exports.insertSeriesById = async (req, res) => {
  try {
    await checkInsertSeriesRequest(req.body.id);

    const series = await getParsedSeries(req.body.id);
    const episodes = await getParsedEpisodes(req.body.id);

    const numberOfSeasons = calculateNumberOfSeasons(episodes.data);

    const tvShowId = await insertSeries(
      req.body.id,
      series.data,
      numberOfSeasons
    );

    await insertEpisodes(tvShowId[0], episodes.data);

    return res.status(201).json({ showId: tvShowId[0] });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};
