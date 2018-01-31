process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../app');
const knex = require('../../db/knex');
const expect = chai.expect;
const jwt = require('jsonwebtoken');
const userModel = require('../../models/user');
const bcrypt = require('bcrypt');
const sinon = require('sinon');

let sandbox;

chai.use(chaiHttp);

describe('Controller: Users', () => {
  beforeEach(done => {
    sandbox = sinon.sandbox.create();
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
    knex.migrate.rollback().then(() => {
      done();
    });
  });

  describe('When the login function is called', () => {
    it('should respond with 500 if while looking for user data in the database, it returns an error', done => {
      sandbox.stub(userModel, 'getAll').rejects();
      chai
        .request(server)
        .post('/users/login')
        .send({ email: 'user1@watchalong.com', password: 'password' })
        .end((err, res) => {
          res.should.have.status(500);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal(
            'An error occured while fetching user data from the database.'
          );
          done();
        });
    });
    it('should respond with 500 if while comparing the password an internal error occurs', done => {
      sandbox.stub(bcrypt, 'compare').rejects();
      chai
        .request(server)
        .post('/users/login')
        .send({ email: 'user1@watchalong.com', password: 'password' })
        .end((err, res) => {
          res.should.have.status(500);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal(
            'An internal error occured while checking the user password.'
          );
          done();
        });
    });
    it('should respond with 500 if while creating user token an internal error occurs', done => {
      sandbox.stub(jwt, 'sign').rejects();
      chai
        .request(server)
        .post('/users/login')
        .send({
          email: 'user1@watchalong.com',
          password: 'password'
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal(
            'An internal error occured while creating the user token.'
          );
          done();
        });
    });
  });
  describe('When the register function is called', () => {
    it('should respond with 500 if while looking for user data in the database, it returns an error', done => {
      sandbox.stub(userModel, 'exists').rejects();

      chai
        .request(server)
        .post('/users/register')
        .send({
          username: 'NewUser',
          email: 'newemail@watchalong.com',
          password: 'password'
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal(
            'An internal error occured while accessing the database.'
          );
          done();
        });
    });
    it('should respond with 500 if while hashing the user password an error occurs', done => {
      sandbox.stub(bcrypt, 'hash').rejects();

      chai
        .request(server)
        .post('/users/register')
        .send({
          username: 'NewUser',
          email: 'newemail@watchalong.com',
          password: 'password'
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal(
            'An internal error occured while hashing the user password.'
          );
          done();
        });
    });
    it('should respond with 500 if while inserting the user into the database an error occurs', done => {
      sandbox.stub(userModel, 'insert').rejects();

      chai
        .request(server)
        .post('/users/register')
        .send({
          username: 'NewUser',
          email: 'newemail@watchalong.com',
          password: 'password'
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal(
            'An internal error occured while inserting the user into the database.'
          );
          done();
        });
    });
    it('should respond with 500 if while creating user token an internal error occurs', done => {
      sandbox.stub(jwt, 'sign').rejects();

      chai
        .request(server)
        .post('/users/register')
        .send({
          username: 'NewUser',
          email: 'newemail@watchalong.com',
          password: 'password'
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal(
            'An internal error occured while creating the user token.'
          );
          done();
        });
    });
  });
});
