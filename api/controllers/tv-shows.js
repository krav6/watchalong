const thetvdbController = require('./externals/thetvdb');
const debug = require('debug')('controller:tv-shows');
const tvShowModel = require('../models/tv-show');
const episodeModel = require('../models/episode');

exports.getSeriesByIdFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getSeriesById(req.params.id);
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    res.sendStatus(503);
  }
};

exports.getEpisodeByIdFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getEpisodeById(req.query.id);
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    res.sendStatus(503);
  }
};

exports.getEpisodesBySeriesFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getEpisodesBySeries(req.params.id);
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    res.sendStatus(503);
  }
};

exports.searchSeriesFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.searchSeries(req.query);
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    res.sendStatus(503);
  }
};

exports.getSeriesImagesByIdFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getSeriesImagesById(req.params.id);
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    res.sendStatus(503);
  }
};

exports.getSeriesPostersByIdFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getSeriesPostersById(req.params.id);
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    res.sendStatus(503);
  }
};

exports.getSeriesSeasonPostersByIdFromTvDb = async (req, res) => {
  try {
    const result = await thetvdbController.getSeriesSeasonPostersById(
      req.params.id
    );
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    res.sendStatus(503);
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
  return await tvShowModel.insert(
    seriesId,
    seriesData.seriesName,
    seriesData.firstAired.length == 0 ? null : seriesData.firstAired,
    seriesData.overview,
    seriesData.runtime,
    numberOfSeasons
  );
};

const insertEpisodes = async (seriesId, episodeData) => {
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
};

const getParsedSeries = async seriesId => {
  return JSON.parse(await thetvdbController.getSeriesById(seriesId));
};

const getParsedEpisodes = async seriesId => {
  return JSON.parse(await thetvdbController.getEpisodesBySeries(seriesId));
};

exports.insertSeriesById = async (req, res) => {
  try {
    if (await tvShowModel.exists(req.body.id)) {
      return res.status(503).json({
        message: `Series with the id of ${
          req.body.id
        } is already stored in the databese.`
      });
    }

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
    res.sendStatus(503);
  }
};
