const utils = require('./testcases/utils');

describe('Users', () => {
    describe('Test cases', () => {
        /* Require all the test cases files here and they will be executed in the same order */
        console.log('--------------------------test cases start--------------------------');
        require('./testcases/server.js');
        require('./testcases/auth.js');
        require('./testcases/ticket.js');
        console.log('--------------------------test cases completed--------------------------');
    });
});