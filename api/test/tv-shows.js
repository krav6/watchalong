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
  if(!nock.isActive()) nock.activate();
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

  it('should respond with 503 when the series request fails', done => {
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
