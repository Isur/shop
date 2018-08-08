const chai = require('chai');
const server = require('../server');
const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

it('should list ALL products on /products/all GET', function(done) {
    chai.request(server)
      .get('/products/all/all?page=1&sort=value')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should list searched products on /products/search GET', function(done) {
    chai.request(server)
      .get('/products/all/search?name=Soft&page=1&sort=value')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should not allow not logged users on user/all/', (done ) => {
    chai.request(server)
      .get('/user/all')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });