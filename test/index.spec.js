const chai = require('chai');
const sinon = require('sinon');

chai.should();

const expresStatusMonitor = require('../index');
const defaultConfig = require('../helpers/default-config');

describe('express-status-monitor', () => {
  describe('when initialised', () => {
    const middleware = expresStatusMonitor();

    it('then it should be an instance of Function', () => {
      middleware.should.be.an.instanceof(Function);
    });

    const req = { socket: {} };
    const res = { send: sinon.stub() };
    const next = sinon.stub();

    describe('when invoked', () => {
      beforeEach(() => {
        req.path = defaultConfig.path;
        res.send.reset();
      });

      it(`and req.path === ${defaultConfig.path}, then res.send called`, () => {
        middleware(req, res, next);
        sinon.assert.called(res.send);
      });

      it(`and req.path !== ${defaultConfig.path}, then res.send not called`, () => {
        req.path = '/another-path';
        middleware(req, res, next);
        sinon.assert.notCalled(res.send);
      });
    });
  });
});
