const request = require('request-promise-native');
const baseUrl = 'https://api.thetvdb.com/';
const debug = require('debug')('controller:thetvdb');

let token;
let loginGuard = false;

const login = async () => {
  debug(`Sending login request to thetvdb`);
  const res = await request({
    method: 'POST',
    uri: `${baseUrl}login`,
    body: {
      apikey: process.env.THETVDB_API_KEY
    },
    json: true
  });

  debug(`Received token from thetvdb: ${res.token}`);
  token = res.token;
  return token;
};

const getToken = () => {
  if (typeof token == 'undefined') {
    return login();
  }
  debug(`thetvdb token is: ${token}`);
  return token;
};

const sendRequest = async (dest, query) => {
  try {
    const bearerToken = await getToken();

    const requestData = {
      method: 'GET',
      uri: `${baseUrl}${dest}`,
      headers: { Authorization: `Bearer ${bearerToken}` }
    };

    if (typeof query != 'undefined') {
      Object.assign(requestData, {
        qs: query
      });
    }

    return await request(requestData);
  } catch (error) {
    if (error.statusCode === 401 && !loginGuard) {
      loginGuard = true;
      await login();
      return sendRequest(dest, query);
    } else {
      loginGuard = false;
      return Promise.reject(error);
    }
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
