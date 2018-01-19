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

chai.use(chaiHttp);

describe('Users Controller', () => {
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
    knex.migrate.rollback().then(() => {
      done();
    });
  });
  describe('login', () => {
    it('should return user token with the correct password', async () => {
      const res = await chai
        .request(server)
        .post('/users/login')
        .send({ email: 'user1@watchalong.com', password: 'password' });

        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('token');

        const decoded = await jwt.verify(res.body.token, process.env.SECRET_KEY);

        expect(decoded.exp - decoded.iat).to.equal(+process.env.TOKEN_EXPIRY);
        expect(decoded.id).to.equal(1);
    });

    it("should respond with 400 if the user and password doesn't match", async () => {
      try{
        await chai
        .request(server)
        .post('/users/login')
        .send({ email: 'user1@watchalong.com', password: 'irrevelant' });

        expect.fail(null, null, "Should not succeed");
      }catch({response}){
        expect(response).to.have.status(400);
        expect(response).to.be.json;
        expect(response).to.have.property('error');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal("Email and password doesn't match.");
      }
    });

    it("should respond with 400 if the user doesn't exist", async () => {
      try {
        await chai
        .request(server)
        .post('/users/login')
        .send({ email: 'irrevelant', password: 'irrevelant'});

        expect.fail(null, null, "Should not succeed");
      } catch ({response}) {
        expect(response).to.have.status(400);
        expect(response).to.be.json;
        expect(response).to.have.property('error');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal("User not found.");
      }
    });
  });

  describe('register', () => {
    it('should respond with 400 if the given e-mail address is already registered', done => {
      chai
        .request(server)
        .post('/users/register')
        .send({ username: 'irrevelant', email: 'user1@watchalong.com' })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal('User already exists.');

          done();
        });
    });

    it('should respond with 400 if the given username is already registered', done => {
      chai
        .request(server)
        .post('/users/register')
        .send({
          username: 'User001',
          email: 'irrevelant@watchalong.com'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal('User already exists.');
          done();
        });
    });

    it('should respond with 201 and a token if the given username and e-mail address is not yet registered', async () => {
      const res = await chai
        .request(server)
        .post('/users/register')
        .send({ username: 'NewUser', email: 'newemail@watchalong.com', password: 'password' });

        res.should.have.status(201);

        const users = await userModel
            .getAll()
            .where({
              username: 'NewUser', email: 'newemail@watchalong.com'
            });

        expect(users.length).to.equal(1);

        const isPasswordMatches = await bcrypt.compare('password', users[0].password);
        expect(isPasswordMatches).to.be.true;

        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('token');

        const decoded = await jwt.verify(res.body.token, process.env.SECRET_KEY);

        expect(decoded.exp - decoded.iat).to.equal(+process.env.TOKEN_EXPIRY);
        expect(decoded.id).to.equal(users[0].id);
    });
  });
});
