process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../app');
const knex = require('../../db/knex');
const thetvdbController = require('../../controllers/externals/thetvdb');
const tvShowModel = require('../../models/tv-show');
const episodeModel = require('../../models/episode');
const expect = chai.expect;
const nock = require('nock');
const thetvdbApiUrl = 'https://api.thetvdb.com';

chai.use(chaiHttp);

describe('Component: TV Shows', () => {
  beforeEach(done => {
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

    knex.migrate.rollback().then(() => {
      done();
    });
  });

  const requestedResourceNotFoundTester = (dest, req, qs) => {
    return () => {
      nock(thetvdbApiUrl)
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get(`/${req}`)
        .query('undefined' === qs ? {} : qs)
        .reply(404);

      chai
        .request(server)
        .get(`/tvshows/thetvdb/${dest}`)
        .query('undefined' === qs ? {} : qs)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal(
            'Requested resource is not found in the TheTvDb.'
          );
          done();
        });
    };
  };

  describe('When the /series/:id route is called', () => {
    it(
      'should respond with 404 if the requested resource is not found',
      requestedResourceNotFoundTester('series/1', 'series/1')
    );
    it('should respond with the series data when the request is successful', done => {
      nock(thetvdbApiUrl)
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/1')
        .reply(200, JSON.stringify({ seriesName: 'Vikings' }));

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
  describe('When the /episode/:id route is called', () => {
    it(
      'should respond with 404 if the requested resource is not found',
      requestedResourceNotFoundTester('episode/1', 'episode/1')
    );

    it('should respond with the episode data when the request is successful', done => {
      nock(thetvdbApiUrl)
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/episode/1')
        .reply(200, JSON.stringify({ episodeName: 'Remember Budapest' }));

      chai
        .request(server)
        .get('/tvshows/thetvdb/episode/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          expect(res.body).to.have.property('episodeName');
          expect(res.body.episodeName).to.equal('Remember Budapest');
          done();
        });
    });
  });
  describe('When the /series/:id/episodes route is called', () => {
    it(
      'should respond with 404 if the requested resource is not found',
      requestedResourceNotFoundTester('series/1/episodes', 'series/1/episodes')
    );

    it('should respond with the episodes data when the request is successful', done => {
      nock(thetvdbApiUrl)
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/1/episodes')
        .reply(200, JSON.stringify({ episodeName: 'Remember Budapest' }));

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/1/episodes')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          expect(res.body).to.have.property('episodeName');
          expect(res.body.episodeName).to.equal('Remember Budapest');
          done();
        });
    });
  });
  describe('When the search/series route is called', () => {
    it(
      'should respond with 404 if the requested resource is not found',
      requestedResourceNotFoundTester('search/series', 'search/series', {
        name: 'Vikings'
      })
    );

    it('should respond with the series data when the request is successful', done => {
      nock(thetvdbApiUrl)
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/search/series')
        .query({ name: 'Vikings' })
        .reply(200, JSON.stringify({ seriesName: 'Vikings' }));

      chai
        .request(server)
        .get('/tvshows/thetvdb/search/series')
        .query({ name: 'Vikings' })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          expect(res.body).to.have.property('seriesName');
          expect(res.body.seriesName).to.equal('Vikings');
          done();
        });
    });
  });
  describe('When the /series/:id/images route is called', () => {
    it(
      'should respond with 404 if the requested resource is not found',
      requestedResourceNotFoundTester('series/1/images', 'series/1/images')
    );

    it('should respond with the image data when the request is successful', done => {
      nock(thetvdbApiUrl)
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/1/images')
        .reply(200, JSON.stringify({ imageData: 'data' }));

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/1/images')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          expect(res.body).to.have.property('imageData');
          expect(res.body.imageData).to.equal('data');
          done();
        });
    });
  });
  describe('When the /series/:id/posters route is called', () => {
    it(
      'should respond with 404 if the requested resource is not found',
      requestedResourceNotFoundTester(
        'series/1/posters',
        'series/1/images/query',
        { keyType: 'poster' }
      )
    );
    it('should respond with the image data when the request is successful', done => {
      nock(thetvdbApiUrl)
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/1/images/query')
        .query({ keyType: 'poster' })
        .reply(200, JSON.stringify({ imageData: 'data' }));

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/1/posters')
        .query({ keyType: 'poster' })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          expect(res.body).to.have.property('imageData');
          expect(res.body.imageData).to.equal('data');
          done();
        });
    });
  });

  describe('When the /series/:id/seasonposters route is called', () => {
    it(
      'should respond with 404 if the requested resource is not found',
      requestedResourceNotFoundTester(
        'series/1/seasonposters',
        'series/1/images/query',
        { keyType: 'season' }
      )
    );
    it('should respond with the image data when the request is successful', done => {
      nock(thetvdbApiUrl)
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get('/series/1/images/query')
        .query({ keyType: 'season' })
        .reply(200, JSON.stringify({ imageData: 'data' }));

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/1/seasonposters')
        .query({ keyType: 'season' })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          expect(res.body).to.have.property('imageData');
          expect(res.body.imageData).to.equal('data');
          done();
        });
    });
  });
  describe('When the /series/insert/ route is called', () => {
    it('should respond with 404 if the requested series resource is not found', done => {
      nock(thetvdbApiUrl)
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      nock(thetvdbApiUrl)
        .get(`/series/999`)
        .reply(404);

      chai
        .request(server)
        .post(`/tvshows/series/insert`)
        .send({ id: 999 })
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal(
            'Requested resource is not found in the TheTvDb.'
          );
          done();
        });
    });
    it('should respond with 403 if the requested series is already inserted to the database', done => {
      nock(thetvdbApiUrl)
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      chai
        .request(server)
        .post(`/tvshows/series/insert`)
        .send({ id: 1 })
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal(`Series with the id of 1 is already stored in the database.`);
          done();
        });
    });
    it('should respond with 201 if the request was successful', async () => {
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

      const res = await chai
        .request(server)
        .post(`/tvshows/series/insert`)
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
