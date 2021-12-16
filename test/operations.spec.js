const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const faker = require('faker')
chai.use(chaiHttp);

describe('operations check', () => {

    it('Should return a sum of two numbers', done => {
        const a = faker.datatype.float(2)
        const b = faker.datatype.float(2)
        const sum = a + b
        chai.request(server)
            .post('/operations/sum')
            .send({
              a,
              b
            })
            .then(operation => {
                operation.body.suma.should.eql(`${a} + ${b} = ${sum}`);
                done();
            })
    });

    it('Should return a substract of two numbers', done => {
      const a = faker.datatype.float(2)
      const b = faker.datatype.float(2)
      const substract = a - b
      chai.request(server)
          .post('/operations/substract')
          .send({
            a,
            b
          })
          .then(operation => {
              operation.body.resta.should.eql(`${a} - ${b} = ${substract}`);
              done();
          })
  });

  it('Should return a multiply of two numbers', done => {
    const a = faker.datatype.float(2)
    const b = faker.datatype.float(2)
    const multiply = a * b
    chai.request(server)
        .post('/operations/multiply')
        .send({
          a,
          b
        })
        .then(operation => {
            operation.body.multiplicacion.should.eql(`${a} x ${b} = ${multiply}`);
            done();
        })
});

it('Should return a divide of two numbers', done => {
  const a = faker.datatype.float(2)
  const b = faker.datatype.float(2)
  const divide = a / b
  chai.request(server)
      .post('/operations/divide')
      .send({
        a,
        b
      })
      .then(operation => {
          operation.body.division.should.eql(`${a} / ${b} = ${divide.toFixed(2)}`);
          done();
      })
});

});
