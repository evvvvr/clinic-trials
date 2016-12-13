/* eslint-disable import/no-extraneous-dependencies, no-console */

import chai from 'chai';
import chaiHttp from 'chai-http';
import { after, describe, it } from 'mocha';
import HttpStatus from 'http-status-codes';

import server from '../../../../server/index';

chai.should();
chai.use(chaiHttp);

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
  });
});
