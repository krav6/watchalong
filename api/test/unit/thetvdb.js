process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../../app');
const knex = require('../../db/knex');
const thetvdbController = require('../../controllers/externals/thetvdb');
const nock = require('nock');
const thetvdbApiUrl = 'https://api.thetvdb.com';

chai.use(chaiHttp);

describe('Controller: TheTVDB', () => {
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

  const loginErrorTester = functionToTest => {
    return async () => {
      nock(thetvdbApiUrl)
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(404);

      const id = 1;
      try {
        const res = await functionToTest(id);
        expect.fail(null, null, 'Should not succeed.');
      } catch (error) {
        expect(error).to.have.property('status');
        expect(error.status).to.equal(500);
        expect(error).to.have.property('message');
        expect(error.message).to.equal(
          'An error occured while requesting token from TheTVDb.'
        );
      }
    };
  };

  const loginErrorGuardTester = (functionToTest, testedRoute, qs) => {
    return async () => {
      const scope = nock(thetvdbApiUrl)
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      scope
        .get(testedRoute)
        .query('undefined' === qs ? {} : qs)
        .reply(401);

      scope
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      scope
        .get(testedRoute)
        .query('undefined' === qs ? {} : qs)
        .reply(401);

      const id = 1;
      try {
        const res = await functionToTest(id);
        expect.fail(null, null, 'Should not succeed.');
      } catch (error) {
        expect(error).to.have.property('status');
        expect(error.status).to.equal(500);
        expect(error).to.have.property('message');
        expect(error.message).to.equal(
          'An error occured while sending request to TheTVDb.'
        );
        expect(scope.isDone()).to.be.true;
      }
    };
  };

  const loginErrorGuardSuccessTester = (functionToTest, testedRoute, qs) => {
    return async () => {
      const scope = nock(thetvdbApiUrl)
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      scope
        .get(testedRoute)
        .query('undefined' === qs ? {} : qs)
        .reply(401);

      scope
        .post('/login', { apikey: process.env.THETVDB_API_KEY })
        .reply(200, { token: 'token' });

      scope
        .get(testedRoute)
        .query('undefined' === qs ? {} : qs)
        .reply(200, { status: 200 });

      const id = 1;
      const res = JSON.parse(await functionToTest(id));
      expect(res.status).to.equal(200);
    };
  };

  describe('When the getSeriesById is called', () => {
    it(
      'should respond with 500 if the login request fails',
      loginErrorTester(thetvdbController.getSeriesById)
    );
    it(
      'should respond with 500 when trying to login and send request after the first request responded with 401, but the second request ultimately failed as well',
      loginErrorGuardTester(thetvdbController.getSeriesById, '/series/1')
    );
    it(
      'should respond with 200 when trying to login and send request after the first request responded with 401, but the second request was successful',
      loginErrorGuardSuccessTester(thetvdbController.getSeriesById, '/series/1')
    );
  });
  describe('When the getEpisodeById is called', () => {
    it(
      'should respond with 500 if the login request fails',
      loginErrorTester(thetvdbController.getEpisodeById)
    );
    it(
      'should respond with 500 when trying to login and send request after the first request responded with 401, but the second request ultimately failed as well',
      loginErrorGuardTester(thetvdbController.getEpisodeById, '/episode/1')
    );
    it(
      'should respond with 200 when trying to login and send request after the first request responded with 401, but the second request was successful',
      loginErrorGuardSuccessTester(
        thetvdbController.getEpisodeById,
        '/episode/1'
      )
    );
  });
  describe('When the getEpisodesBySeries is called', () => {
    it(
      'should respond with 500 if the login request fails',
      loginErrorTester(thetvdbController.getEpisodesBySeries)
    );
    it(
      'should respond with 500 when trying to login and send request after the first request responded with 401, but the second request ultimately failed as well',
      loginErrorGuardTester(
        thetvdbController.getEpisodesBySeries,
        '/series/1/episodes'
      )
    );
    it(
      'should respond with 200 when trying to login and send request after the first request responded with 401, but the second request was successful',
      loginErrorGuardSuccessTester(
        thetvdbController.getEpisodesBySeries,
        '/series/1/episodes'
      )
    );
  });
  describe('When the searchSeries is called', () => {
    it(
      'should respond with 500 if the login request fails',
      loginErrorTester(thetvdbController.getEpisodesBySeries)
    );
    it(
      'should respond with 500 when trying to login and send request after the first request responded with 401, but the second request ultimately failed as well',
      loginErrorGuardTester(thetvdbController.searchSeries, '/search/series')
    );
    it(
      'should respond with 200 when trying to login and send request after the first request responded with 401, but the second request was successful',
      loginErrorGuardSuccessTester(
        thetvdbController.searchSeries,
        '/search/series'
      )
    );
  });
  describe('When the getSeriesImagesById is called', () => {
    it(
      'should respond with 500 if the login request fails',
      loginErrorTester(thetvdbController.getSeriesImagesById)
    );
    it(
      'should respond with 500 when trying to login and send request after the first request responded with 401, but the second request ultimately failed as well',
      loginErrorGuardTester(
        thetvdbController.getSeriesImagesById,
        '/series/1/images'
      )
    );
    it(
      'should respond with 200 when trying to login and send request after the first request responded with 401, but the second request was successful',
      loginErrorGuardSuccessTester(
        thetvdbController.getSeriesImagesById,
        '/series/1/images'
      )
    );
  });
  describe('When the getSeriesPostersById is called', () => {
    it(
      'should respond with 500 if the login request fails',
      loginErrorTester(thetvdbController.getSeriesPostersById)
    );
    it(
      'should respond with 500 when trying to login and send request after the first request responded with 401, but the second request ultimately failed as well',
      loginErrorGuardTester(
        thetvdbController.getSeriesPostersById,
        '/series/1/images/query',
        { keyType: 'poster' }
      )
    );
    it('should respond with 200 when trying to login and send request after the first request responded with 401, but the second request was successful', loginErrorGuardSuccessTester(
        thetvdbController.getSeriesPostersById,
        '/series/1/images/query',
        { keyType: 'poster' }
      ));
  });
  describe('When the getSeriesSeasonPostersById is called', () => {
    it(
      'should respond with 500 if the login request fails',
      loginErrorTester(thetvdbController.getSeriesSeasonPostersById)
    );
    it(
      'should respond with 500 when trying to login and send request after the first request responded with 401, but the second request ultimately failed as well',
      loginErrorGuardTester(
        thetvdbController.getSeriesSeasonPostersById,
        '/series/1/images/query',
        { keyType: 'season' }
      )
    );
    it('should respond with 200 when trying to login and send request after the first request responded with 401, but the second request was successful', loginErrorGuardSuccessTester(
        thetvdbController.getSeriesSeasonPostersById,
        '/series/1/images/query',
        { keyType: 'season' }
      ));
  });
});
