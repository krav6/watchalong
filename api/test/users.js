process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../app');

chai.use(chaiHttp);

describe('Users Controller', function() {
  describe('login', function() {
    it('should return todo', function(done) {
      chai
        .request(server)
        .post('/users/login')
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });
  });
});
