const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const server = require('../app');
const should = chai.should();
const sinon = require('sinon');
const PAYMENT_FILE_PATH = path.resolve('./payment-generated.txt');
const {Request, Response} = require('./mock');
const utils = require('./utils');

chai.use(chaiHttp);

describe('shipment check', () => {
    let req, res, next, agent;

    beforeEach((done) => {
        req = new Request();
        res = new Response();
        next = sinon.stub();
        utils.generatePaymentFile()
            .then(() => {
                done();
            })
    });

    afterEach((done) => {
        if (agent) {
            agent.close();
        }
        // done();
        utils.removeFile(PAYMENT_FILE_PATH)
        .then(() => done() )
    });

    it('Should return a status 201', done => {
        chai.request(server)
            .post('/shipment/create')
            .then(shipment => {
                shipment.status.should.eql(201);
                done();
            })
    });

    it('Should return an address', done => {
      chai.request(server)
          .get('/shipment/')
          .then(shipment => {
              shipment.body.should.have.property('address');
              done();
          })
  });
});
