process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../app');
const knex = require('../../db/knex');
const thetvdbController = require('../../controllers/externals/thetvdb');
const tvShowModel = require('../../models/tv-show');
const episodeModel = require('../../models/episode');
const nock = require('nock');
const thetvdbApiUrl = 'https://api.thetvdb.com';
const sinon = require('sinon');

let sandbox;

chai.use(chaiHttp);

describe('Controller: TV Shows', () => {
  beforeEach(done => {
    sandbox = sinon.sandbox.create();
    if (!nock.isActive()) nock.activate();
    knex.migrate.rollback().then(() => {
      knex.migrate.latest().then(() => {
        return knex.seed.run().then(() => {
          done();
        });
      });
    });
  });

  afterEach(done => {
    nock.cleanAll();
    sandbox.restore();
    knex.migrate.rollback().then(() => {
      done();
    });
  });

  const insertSeriesByIdServerFailureTester = (
    stubbedClass,
    stubbedFunction,
    errorMessage
  ) => {
    return () => {
      const seriesId = 999;
      const series = {
        data: {
          seriesName: 'TestSeries',
          firstAired: '2017-03-22',
          overview: 'This is an overview',
          runtime: 99
        }
      };

      const episodes = {
        data: [
          {
            airedSeason: 1,
            airedEpisodeNumber: 1,
            episodeName: 'Remember Budapest',
            firstAired: '2017-03-22',
            overview: 'Another overview'
          },
          {
            airedSeason: 1,
            airedEpisodeNumber: 2,
            episodeName: 'Remember Budapest2',
            firstAired: '2017-03-23',
            overview: 'Another overview2'
          }
        ]
      };

      nock(thetvdbApiUrl)
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get(`/series/${seriesId}`)
        .reply(200, JSON.stringify(series));

      nock(thetvdbApiUrl)
        .get(`/series/${seriesId}/episodes`)
        .reply(200, JSON.stringify(episodes));

      sandbox.stub(stubbedClass, stubbedFunction).rejects();

      chai
        .request(server)
        .post(`/tvshows/series/insert`)
        .send({ id: seriesId })
        .end((err, res) => {
          res.should.have.status(500);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal(errorMessage);
        });
    };
  };
  describe('When the insertSeriesById is called', () => {
    it(
      'should respond with 500 if while fetching series data from the database, an error occurs',
      insertSeriesByIdServerFailureTester(
        tvShowModel,
        'exists',
        'An error occured while fetching series data from the database.'
      )
    );
    it(
      'should respond with 500 if while inserting the series into the database, an error occurs',
      insertSeriesByIdServerFailureTester(
        episodeModel,
        'insert',
        'An error occured while inserting series data from the database.'
      )
    );
    it(
      'should respond with 500 if while inserting an episode into the database, an error occurs',
      insertSeriesByIdServerFailureTester(
        episodeModel,
        'insert',
        'An error occured while inserting episode data from the database.'
      )
    );
  });
});
