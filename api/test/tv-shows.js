process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');
const knex = require('../db/knex');
const thetvdbController = require('../controllers/externals/thetvdb');
const tvShowModel = require('../models/tv-show');
const episodeModel = require('../models/episode');
const expect = chai.expect;
const nock = require('nock');
const sinon = require('sinon');
const thetvdbApiUrl = 'https://api.thetvdb.com';
let sandbox;

chai.use(chaiHttp);

describe('TV Shows', () => {
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
    sandbox.restore();

    nock.cleanAll();

    knex.migrate.rollback().then(() => {
      done();
    });
  });
  describe('login', () => {
    it('should respond with 503 when the login request fails', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(404);

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/1')
        .end((err, res) => {
          res.should.have.status(503);
          done();
        });
    });
  });
  describe('series', () => {
    it('should respond with 503 when the series request fails', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/1')
        .reply(404);

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/1')
        .end((err, res) => {
          res.should.have.status(503);
          done();
        });
    });

    it('should respond with the series data when the series request is successful', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/1')
        .reply(200, { seriesName: 'Vikings' });

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          expect(res.body).to.have.property('seriesName');
          expect(res.body.seriesName).to.equal('Vikings');
          done();
        });
    });
  });
  describe('episode', () => {
    it('should respond with 503 when the episode request fails', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/episode/something')
        .reply(404);

      chai
        .request(server)
        .get('/tvshows/thetvdb/episode')
        .query({ id: 'something' })
        .end((err, res) => {
          res.should.have.status(503);
          done();
        });
    });

    it('should respond with the episode data when the episode request is successful', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/episode/something')
        .reply(200, { episodeName: 'Remember Budapest' });

      chai
        .request(server)
        .get('/tvshows/thetvdb/episode')
        .query({ id: 'something' })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          expect(res.body).to.have.property('episodeName');
          expect(res.body.episodeName).to.equal('Remember Budapest');
          done();
        });
    });
  });
  describe('search/series', () => {
    it('should respond with 503 when the search/series request fails', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/search/series')
        .query({ name: 'Vikings' })
        .reply(404);

      chai
        .request(server)
        .get('/tvshows/thetvdb/search/series')
        .query({ name: 'Vikings' })
        .end((err, res) => {
          res.should.have.status(503);
          done();
        });
    });

    it('should respond with series data when the search series request is successful', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/search/series')
        .query({ name: 'Vikings' })
        .reply(200, { series: 'Vikings' });

      chai
        .request(server)
        .get('/tvshows/thetvdb/search/series')
        .query({ name: 'Vikings' })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          expect(res.body).to.have.property('series');
          expect(res.body.series).to.equal('Vikings');
          done();
        });
    });
  });

  describe('series/:id/episodes', () => {
    it('should respond with 503 when the series/:id/episodes request fails', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/266/episodes')
        .reply(404);

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/266/episodes')
        .end((err, res) => {
          res.should.have.status(503);
          done();
        });
    });

    it('should respond with series data when the series/:id/episodes request is successful', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/266/episodes')
        .reply(200, { episodeName: 'Remember Budapest' });

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/266/episodes')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          expect(res.body).to.have.property('episodeName');
          expect(res.body.episodeName).to.equal('Remember Budapest');
          done();
        });
    });
  });

  describe('series/:id/images', () => {
    it('should respond with 503 when the series/:id/images request fails', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/266/images')
        .reply(404);

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/266/images')
        .end((err, res) => {
          res.should.have.status(503);
          done();
        });
    });

    it('should respond with series data when the series/:id/images request is successful', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/266/images')
        .reply(200, {});

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/266/images')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });
  });

  describe('series/:id/posters', () => {
    it('should respond with 503 when the series/:id/posters request fails', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/266/images/query')
        .query({ keyType: 'poster' })
        .reply(404);

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/266/posters')
        .end((err, res) => {
          res.should.have.status(503);
          done();
        });
    });

    it('should respond with series data when the series/:id/posters request is successful', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/266/images/query')
        .query({ keyType: 'poster' })
        .reply(200, {});

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/266/posters')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });
  });

  describe('series/:id/seasonposters', () => {
    it('should respond with 503 when the series/:id/seasonposters request fails', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/266/images/query')
        .query({ keyType: 'season' })
        .reply(404);

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/266/seasonposters')
        .end((err, res) => {
          res.should.have.status(503);
          done();
        });
    });

    it('should respond with series data when the series/:id/seasonposters request is successful', done => {
      nock(thetvdbApiUrl)
        .post('/login')
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/266/images/query')
        .query({ keyType: 'season' })
        .reply(200, {});

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/266/seasonposters')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });
  });

  describe('series/insert', () => {
    it('should respond with 503 if the series is already stored', async () => {
      const seriesId = 1;

      try {
        await chai
          .request(server)
          .post('/tvshows/series/insert')
          .send({ id: seriesId });

        expect.fail(null, null, 'Should not succeed');
      } catch ({ response }) {
        expect(response).to.have.status(503);
        expect(response).to.be.json;
        expect(response).to.have.property('error');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(
          `Series with the id of ${seriesId} is already stored in the databese.`
        );
      }
    });

    it('should respond with 503 if could not get the parsed series', async () => {
      const seriesId = 2;
      sandbox
        .stub(thetvdbController, 'getSeriesById')
        .withArgs(seriesId)
        .rejects();
      try {
        await chai
          .request(server)
          .post('/tvshows/series/insert')
          .send({ id: seriesId });

        expect.fail(null, null, 'Should not succeed');
      } catch ({ response }) {
        expect(response).to.have.status(503);
      }
    });

    it('should respond with 503 if could not get the parsed episodes', async () => {
      const seriesId = 2;
      sandbox
        .stub(thetvdbController, 'getSeriesById')
        .withArgs(seriesId)
        .returns('{}');
      sandbox
        .stub(thetvdbController, 'getEpisodesBySeries')
        .withArgs(seriesId)
        .rejects();
      try {
        await chai
          .request(server)
          .post('/tvshows/series/insert')
          .send({ id: seriesId });

        expect.fail(null, null, 'Should not succeed');
      } catch ({ response }) {
        expect(response).to.have.status(503);
      }
    });

    it('should respond with 201 and show id with inserted series and episodes with correct data', async () => {
      const seriesId = 2;
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

      sandbox
        .stub(thetvdbController, 'getSeriesById')
        .withArgs(seriesId)
        .returns(JSON.stringify(series));
      sandbox
        .stub(thetvdbController, 'getEpisodesBySeries')
        .withArgs(seriesId)
        .returns(JSON.stringify(episodes));

      const res = await chai
        .request(server)
        .post('/tvshows/series/insert')
        .send({ id: seriesId });

      res.should.have.status(201);
      res.should.be.json;

      const shows = await tvShowModel.getAll().where({ thetvdb_id: seriesId });
      expect(shows.length).to.equal(1);

      res.body.should.have.property('showId');
      res.body.showId.should.equal(shows[0].id);

      const firstEpisode = await episodeModel.exists(
        shows[0].id,
        episodes.data[0].airedSeason,
        episodes.data[0].airedEpisodeNumber
      );

      const secondEpisode = await episodeModel.exists(
        shows[0].id,
        episodes.data[1].airedSeason,
        episodes.data[1].airedEpisodeNumber
      );

      expect(firstEpisode && secondEpisode).to.be.true;
    });
  });
});
