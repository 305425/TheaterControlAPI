var chai = require('chai');
var should = chai.should;
var expect = chai.expect;
should();
const utils = require('./utils');
let context = utils.context;
describe('Auth token', async () => {
    describe('POST /api/v1/login', () => {
        it('should receive a jwt token after login', () => {
            context.request
                .post(context.api + '/login')
                .set('content-type', 'application/json')
                .send({
                    email: context.email,
                    password: context.password,
                })
                .expect(200, (err, res) => {
                    chai.assert.notEqual(res.headers.authorization.length, 0)
                    context.token = res.headers.authorization;
                });
        });
    });
});