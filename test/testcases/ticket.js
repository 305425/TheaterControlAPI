var chai = require('chai');
var should = chai.should;
var expect = chai.expect;
should();
const utils = require('./utils');
let context = utils.context;
describe('Ticket', async () => {
    describe('create ticket', () => {
        it('should not be able to create ticket without auth token', () => {
            context.request.post(context.api + '/createticket')
                .set('content-type', 'application/json')
                .send({
                    "customerName": "Test2",
                    "performanceTitle": "Title2",
                    "performanceTime": "10 AM",
                    "ticketPrice": 120.50
                })
                .expect(401);
        });
        it('should be able to create ticket with auth token', () => {
            context.request.post(context.api + '/createticket')
                .set('content-type', 'application/json', 'Authorization', 'Bearer ' + context.token)
                .send({
                    "customerName": "Test2",
                    "performanceTitle": "Title2",
                    "performanceTime": "10 AM",
                    "ticketPrice": 120.50
                })
                .expect(201);
        });
        it('api should return 400 status in case of badly formatted input', () => {
            context.request.post(context.api + '/createticket')
                .set('content-type', 'application/json', 'Authorization', 'Bearer ' + context.token)
                .send({
                    "customerName": 111111, //name shuld not be number
                    "performanceTitle": "Title2",
                    "performanceTime": "10 AM",
                    "ticketPrice": 120.50
                })
                .expect(400);
        });
    });
});