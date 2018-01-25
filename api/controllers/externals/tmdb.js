const request = require('request-promise-native');
const baseUrl = 'https://api.themoviedb.org/3/';
const debug = require('debug')('controller:tmdb');

const sendRequest = async (dest, query) => {
  const requestData = {
    method: 'GET',
    uri: `${baseUrl}${dest}`
  };

  let qs = { api_key: process.env.TMDB_API_KEY };

  if (typeof query != 'undefined') {
    Object.assign(qs, query);
  }

  Object.assign(requestData, { qs });

  return await request(requestData);
};

exports.getMovieById = id => {
  return sendRequest(`movie/${id}`);
};
