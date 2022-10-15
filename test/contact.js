let mongoose = require('mongoose');

let Contact = require('../contactModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../api-routes');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Contacts', () => {
    beforeEach((done) => { //Before each test we empty the database
        Contact.remove({}, (err) => { 
           done();           
        });        
    });
  /*
  * Test the /GET route
  */
  describe('/GET contact', () => {
      it('it should GET all the contacts', (done) => {
        chai.request(server)
            .get('/api/contacts')
            .end((err, res) => {
                res.should.have.status(200);
                // res.body.should.be.a('array');
                // res.body.length.should.be.eql(2);
              done();
            });
      });
  });
});