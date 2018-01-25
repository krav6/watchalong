process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');
const knex = require('../db/knex');
const expect = chai.expect;
const nock = require('nock');
const sinon = require('sinon');
const tmdbApiUrl = 'https://api.themoviedb.org/3/';
let sandbox;

chai.use(chaiHttp);

describe('Movies', () => {
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

  describe('movie', () => {
    it('should respond with 503 if the tmdb request fails', done => {
      nock(tmdbApiUrl)
        .get('/movie/1')
        .reply(404);

      chai
        .request(server)
        .get('/movies/tmdb/movie/1')
        .end((err, res) => {
          res.should.have.status(503);
          done();
        });
    });

    it('should respond with 200 and with the result if the tmdb request succeeds', done => {
      const movieData = { title: 'MovieTitle' };

      nock(tmdbApiUrl).log(console.log)
        .get('/movie/1')
        .query({api_key: process.env.TMDB_API_KEY})
        .reply(200, JSON.stringify(movieData));

      chai
        .request(server)
        .get('/movies/tmdb/movie/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('title');
          res.body.title.should.equal(movieData.title);
          done();
        });
    });
  });
});
