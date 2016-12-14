/* eslint-disable import/no-extraneous-dependencies, no-console */

import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import { after, describe, it } from 'mocha';
import HttpStatus from 'http-status-codes';

import server from '../../../../server/index';

chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

const ApiUrl = '/api/v1/trials/applications';

describe('Trial Applications API', () => {
  after(() => { server.close(); });
  describe('POST Trial Application', () => {
    it('It should reject empty object', (done) => {
      chai.request(server)
        .post(ApiUrl)
        .send({})
        .end((err, res) => {
          res.should.have.status(HttpStatus.BAD_REQUEST);

          done();
        });
    });

    it('It should reject application with incorrect phone', (done) => {
      chai.request(server)
        .post(ApiUrl)
        .send({
          gender: 'female',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@doe.com',
          phone: '54',
          age: 22,
          zip: '111',
        })
        .end((err, res) => {
          res.should.have.status(HttpStatus.BAD_REQUEST);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('array');
          res.body.errors.length.should.be.equal(2);
          res.body.errors.should.include.something.that.include.keys({
            property: 'instance.phone',
            message: 'does not match pattern "^\\+?(\\d{7,12})$"',
          });

          done();
        });
    });

    it('It should reject application with no gender specified', (done) => {
      chai.request(server)
        .post(ApiUrl)
        .send({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@doe.com',
          phone: '+5432167',
          age: 22,
          zip: '111',
        })
        .end((err, res) => {
          res.should.have.status(HttpStatus.BAD_REQUEST);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('array');
          res.body.errors.length.should.be.equal(1);
          res.body.errors.should.include.something.that.include.keys({
            property: 'instance',
            message: 'requires property "gender"',
          });

          done();
        });
    });

    it('It should create application with well-formed data', (done) => {
      chai.request(server)
        .post(ApiUrl)
        .send({
          gender: 'female',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@doe.com',
          phone: '+5432167',
          age: 22,
          zip: '111',
        })
        .end((err, res) => {
          res.should.have.status(HttpStatus.CREATED);

          done();
        });
    });
  });
});
