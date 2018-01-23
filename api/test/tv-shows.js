process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');
const knex = require('../db/knex');
const userModel = require('../models/user');
const expect = chai.expect;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nock = require('nock');

chai.use(chaiHttp);

describe('TV Shows Controller', () => {
  if (!nock.isActive()) nock.activate();
  beforeEach(done => {
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
  describe('login', () => {
    it('should respond with 503 when the login request fails', done => {
      nock('https://api.thetvdb.com')
        .post('/login')
        .reply(404);

      chai
        .request(server)
        .get('/tvshows/thetvdb/series')
        .send({ series_id: 'something' })
        .end((err, res) => {
          res.should.have.status(503);
          done();
        });
    });
  });
  describe('series', () => {
    it('should respond with 503 when the series request fails', done => {
      nock('https://api.thetvdb.com')
        .post('/login')
        .reply(200, { token: 'token' });

      nock('https://api.thetvdb.com')
        .get('/series/something')
        .reply(404);

      chai
        .request(server)
        .get('/tvshows/thetvdb/series')
        .query({ id: 'something' })
        .end((err, res) => {
          res.should.have.status(503);
          done();
        });
    });

    it('should respond with the series data when the series request is successful', done => {
      nock('https://api.thetvdb.com')
        .post('/login')
        .reply(200, { token: 'token' });

      nock('https://api.thetvdb.com')
        .get('/series/something')
        .reply(200, { seriesName: 'Vikings' });

      chai
        .request(server)
        .get('/tvshows/thetvdb/series')
        .query({ id: 'something' })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          const body = JSON.parse(res.body);
          expect(body).to.have.property('seriesName');
          expect(body.seriesName).to.equal('Vikings');
          done();
        });
    });
  });
  describe('episode', () => {
    it('should respond with 503 when the episode request fails', done => {
      nock('https://api.thetvdb.com')
        .post('/login')
        .reply(200, { token: 'token' });

      nock('https://api.thetvdb.com')
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
      nock('https://api.thetvdb.com')
        .post('/login')
        .reply(200, { token: 'token' });

      nock('https://api.thetvdb.com')
        .get('/episode/something')
        .reply(200, { episodeName: 'Remember Budapest' });

      chai
        .request(server)
        .get('/tvshows/thetvdb/episode')
        .query({ id: 'something' })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          const body = JSON.parse(res.body);
          expect(body).to.have.property('episodeName');
          expect(body.episodeName).to.equal('Remember Budapest');
          done();
        });
    });
  });
  describe('search/series', () => {
    it('should respond with 503 when the search/series request fails', done => {
      nock('https://api.thetvdb.com')
        .post('/login')
        .reply(200, { token: 'token' });

      nock('https://api.thetvdb.com')
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
      nock('https://api.thetvdb.com')
        .post('/login')
        .reply(200, { token: 'token' });

      nock('https://api.thetvdb.com')
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
          const body = JSON.parse(res.body);
          expect(body).to.have.property('series');
          expect(body.series).to.equal('Vikings');
          done();
        });
    });
  });

  describe('series/:id/episode', () => {
    it('should respond with 503 when the series/:id/episode request fails', done => {
      nock('https://api.thetvdb.com')
        .post('/login')
        .reply(200, { token: 'token' });

      nock('https://api.thetvdb.com')
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

    it('should respond with series data when the series/:id/episode request is successful', done => {
      nock('https://api.thetvdb.com')
        .post('/login')
        .reply(200, { token: 'token' });

      nock('https://api.thetvdb.com')
        .get('/series/266/episodes')
        .reply(200, { episodeName: 'Remember Budapest' });

      chai
        .request(server)
        .get('/tvshows/thetvdb/series/266/episodes')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          const body = JSON.parse(res.body);
          expect(body).to.have.property('episodeName');
          expect(body.episodeName).to.equal('Remember Budapest');
          done();
        });
    });
  });
});
