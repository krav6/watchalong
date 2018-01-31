const request = require('request-promise-native');
const baseUrl = 'https://api.thetvdb.com/';
const debug = require('debug')('controller:thetvdb');

let token;
let loginGuard = false;

const login = async () => {
  try {
    const res = await request({
      method: 'POST',
      uri: `${baseUrl}login`,
      body: {
        apikey: process.env.THETVDB_API_KEY
      },
      json: true
    });

    token = res.token;
    return token;
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: 'An error occured while requesting token from TheTVDb.'
    });
  }
};

const getToken = () => {
  if (typeof token == 'undefined') {
    return login();
  }

  return token;
};
const createRequestData = (destination, bearerToken, query) => {
  const requestData = {
    method: 'GET',
    uri: `${baseUrl}${destination}`,
    headers: { Authorization: `Bearer ${bearerToken}` }
  };

  if (typeof query != 'undefined') {
    Object.assign(requestData, {
      qs: query
    });
  }

  return requestData;
};

const handleRequestError = async (error, dest, query) => {
  if (error.statusCode === 401 && !loginGuard) {
    loginGuard = true;
    await login();
    return sendRequest(dest, query);
  } else if (error.statusCode === 404) {
    return Promise.reject({
      status: 404,
      message: 'Requested resource is not found in the TheTvDb.'
    });
  } else {
    return Promise.reject({
      status: 500,
      message: 'An error occured while sending request to TheTVDb.'
    });
  }
};

const sendRequest = async (dest, query) => {
  const bearerToken = await getToken();

  try {
    const requestData = createRequestData(dest, bearerToken, query);

    return await request(requestData);
  } catch (error) {
    return handleRequestError(error, dest, query);
  }
};

exports.getSeriesById = id => {
  return sendRequest(`series/${id}`);
};

exports.getEpisodeById = id => {
  return sendRequest(`episode/${id}`);
};

exports.getEpisodesBySeries = id => {
  return sendRequest(`series/${id}/episodes`);
};

exports.searchSeries = query => {
  return sendRequest(`search/series`, query);
};

exports.getSeriesImagesById = id => {
  return sendRequest(`series/${id}/images`);
};

const querySeriesImages = (id, keyType) => {
  return sendRequest(`series/${id}/images/query`, { keyType });
};

exports.getSeriesPostersById = id => {
  return querySeriesImages(id, 'poster');
};

exports.getSeriesSeasonPostersById = id => {
  return querySeriesImages(id, 'season');
};
