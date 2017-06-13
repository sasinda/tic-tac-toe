import chai from 'chai'
import sinon from 'sinon'
import { mockReq, mockRes } from 'sinon-express-mock'
import AuthController from '../../src/controllers/auth.ctrl'

// Tell chai that we'll be using the "should" style assertions.
chai.should();
var expect = chai.expect;

describe('AuthController', () => {
    describe('.tempUserAuth', () => {
        let ac;

        beforeEach(() => {
            // Create a new AuthController before each test
            ac = new AuthController();
        });

        it('returns a jwt token', () => {
            var req = mockReq({body:{userName:'Shopkeep'}});
            var res = mockRes();
            ac.tempUserAuth(req,res, ()=>{})
            expect(res.send.calledOnce).to.equal(true);
        });


    });
});
