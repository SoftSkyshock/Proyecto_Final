const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const server = require('../app');
const should = chai.should();
const sinon = require('sinon');
const payment = require('../controllers/payment.controller');
const PAYMENT_FILE_PATH = path.resolve('./payment-generated.txt');
const {Request, Response} = require('./mock');
const utils = require('./utils');
const {uniq} = require('lodash');
const os = require('os')

chai.use(chaiHttp);

describe('payment check', () => {
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

    it('Should generate an random price', (done) => {
        payment.create(req, res);
        setTimeout(() => {
            utils.getFromFile(PAYMENT_FILE_PATH)
                .then(data => {
                    data.length.should.eql(1);
                    done();
                })
        }, 500);
    });

    it('Should generate 5 random prices', done => {
        let n = 10;
        for (let i = 0; i < n; i++) {
            payment.create(req, res);
        }
        setTimeout(() => {
            utils.getFromFile(PAYMENT_FILE_PATH)
                .then(data => {
                    data.length.should.eql(n);
                    const uniqKeys = uniq(data);
                    uniqKeys.length.should.eql(data.length);
                    done();
                })
        }, 500);
    });


    it('Should return 5 promo codes', done => {
        chai.request(server)
            .get('/payment/promos')
            .then(promos => {
                promos.body.length.should.eql(5);
                done();
            })
    });
    /* Nuevos test */
    it('Should return oldContent', done => {
        chai.request(server)
            .post('/payment/apply-discount')
            .send({ discount: 20})
            .then(promos => {
                promos.body.should.have.property('oldContent');
                done();
            })
    });

    it('Should return newContent', done => {
        chai.request(server)
            .post('/payment/apply-discount')
            .send({ discount: 20})
            .then(promos => {
                promos.body.should.have.property('newContent');
                done();
            })
    });

    it('Should return prices with discount aplied or empty data', done => {
        chai.request(server)
            .post('/payment/apply-discount')
            .send({ discount: 20})
            .then(promos => {
                if (promos.body.oldContent !== '' && promos.body.newContent !== '') {
                    const old = promos.body.oldContent.split(os.EOL)
                    const newc = promos.body.newContent.split(os.EOL)
                    old.forEach((o, index) => {
                        o.should.not.equal(newc[index])
                    })
                } else {
                    promos.body.oldContent.length.should.eql(0)
                    promos.body.newContent.length.should.eql(0)
                }
                // promos.body.should.have.property('newContent');
                done();
            })
    });
});