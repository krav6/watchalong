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

chai.use(chaiHttp);

describe('Component: Users', () => {
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

  describe('When the /login route is called', () => {
    it('should respond with 403 if the request does not contain e-mail and password field', done => {
      chai
        .request(server)
        .post('/users/login')
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal('Missing field(s): E-mail, Password');
          done();
        });
    });
    it('should respond with 403 if the request does not contain e-mail field', done => {
      chai
        .request(server)
        .post('/users/login')
        .send({ password: 'password' })
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal('Missing field(s): E-mail');
          done();
        });
    });
    it('should respond with 403 if the request does not contain password field', done => {
      chai
        .request(server)
        .post('/users/login')
        .send({ email: 'something@s.com' })
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal('Missing field(s): Password');
          done();
        });
    });
    it('should respond with 403 if the user was not found in the database', done => {
      chai
        .request(server)
        .post('/users/login')
        .send({ email: 'something@s.com', password: 'password' })
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal('User not found.');
          done();
        });
    });
    it('should respond with 403 if the password does not match with the given email', done => {
      chai
        .request(server)
        .post('/users/login')
        .send({ email: 'user1@watchalong.com', password: 'abcd123' })
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.equal('Email and/or Password mismatch.');
          done();
        });
    });
    it('should respond with 403 in case of SQL injection attack', async () => {
      try {
        const res = await chai
          .request(server)
          .post('/users/login')
          .send({
            email: `smthg@gmail.com’; DROP table users;’--`,
            password: 'password'
          });

        expect.fail(null, null, 'Should not succeed');
      } catch ({ response }) {
        expect(response).to.have.status(403);
        expect(response).to.be.json;
        expect(response).to.have.property('error');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('User not found.');

        const isUsersTableStillExists = await knex.schema.hasTable('users');
        expect(isUsersTableStillExists).to.be.true;
      }
    });
    it('should respond with 200 and user token if the given email and password matches with the database', async () => {
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
  });

  describe('When the /register route is called', () => {
    const registerMissingFieldTester = (fields, errorFields) => {
      return async () => {
        try {
          await chai
            .request(server)
            .post('/users/register')
            .send(fields);

          expect.fail(null, null, 'Should not succeed');
        } catch ({ response }) {
          expect(response).to.have.status(403);
          expect(response).to.be.json;
          expect(response).to.have.property('error');
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.equal(
            'Missing field(s): ' + errorFields
          );
        }
      };
    };
    it(
      'should respond with 403 if the request does not contain username, e-mail and password field',
      registerMissingFieldTester({}, 'Username, E-mail, Password')
    );
    it(
      'should respond with 403 if the request does not contain username and e-mail field',
      registerMissingFieldTester({ password: 'password' }, 'Username, E-mail')
    );
    it(
      'should respond with 403 if the request does not contain e-mail and password field',
      registerMissingFieldTester({ username: 'user' }, 'E-mail, Password')
    );
    it(
      'should respond with 403 if the request does not contain username and password field',
      registerMissingFieldTester(
        { email: 'something@smg.com' },
        'Username, Password'
      )
    );
    it(
      'should respond with 403 if the request does not contain username field',
      registerMissingFieldTester(
        { email: 'something@smg.com', password: 'password' },
        'Username'
      )
    );
    it(
      'should respond with 403 if the request does not contain e-mail field',
      registerMissingFieldTester(
        { username: 'something', password: 'password' },
        'E-mail'
      )
    );
    it(
      'should respond with 403 if the request does not contain password field',
      registerMissingFieldTester(
        { username: 'something', email: 'smg@smg.com' },
        'Password'
      )
    );

    const emailValidationTester = email => {
      return async () => {
        try {
          await chai
            .request(server)
            .post('/users/register')
            .send({
              username: 'something',
              email: email,
              password: 'password'
            });

          expect.fail(null, null, 'Should not succeed');
        } catch ({ response }) {
          expect(response).to.have.status(403);
          expect(response).to.be.json;
          expect(response).to.have.property('error');
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.equal('Not valid e-mail format.');
        }
      };
    };
    it(
      'should respond with 403 if the e-mail field does not contain @ character',
      emailValidationTester('smgsmg.com')
    );
    it(
      'should respond with 403 if the e-mail field does not contain text before the @ character',
      emailValidationTester('@smg.com')
    );
    it(
      'should respond with 403 if the e-mail field does not contain text after the @ character',
      emailValidationTester('smg@')
    );
    it(
      'should respond with 403 if the e-mail field does not contain . character after @ character',
      emailValidationTester('smg@smgcom')
    );
    it(
      'should respond with 403 if the e-mail field does not contain characters between @ and . characters',
      emailValidationTester('smg@.com')
    );
    it(
      'should respond with 403 if the e-mail field does not contain character after the . character',
      emailValidationTester('smg@smg.')
    );

    const userAlreadyExistsTester = (username, email) => {
      return async () => {
        try {
          const res = await chai
            .request(server)
            .post('/users/register')
            .send({
              username: username,
              email: email,
              password: 'password'
            });

          expect.fail(null, null, 'Should not succeed');
        } catch ({ response }) {
          expect(response).to.have.status(403);
          expect(response).to.be.json;
          expect(response).to.have.property('error');
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.equal('User already exists.');
        }
      };
    };

    it('should respond with 403 if the username already exists in the database', userAlreadyExistsTester('User001', 'smg@smg.com'));
    it('should respond with 403 if the e-mail address already exists in the database', userAlreadyExistsTester('NewUserName', 'user1@watchalong.com'));
    it('should respond with 201 and a token if the given username and e-mail address is not yet registered', async () => {
      const res = await chai
        .request(server)
        .post('/users/register')
        .send({
          username: 'NewUser',
          email: 'newemail@watchalong.com',
          password: 'password'
        });

      res.should.have.status(201);

      const users = await userModel
        .getAll()
        .where({
          username: 'NewUser',
          email: 'newemail@watchalong.com'
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
