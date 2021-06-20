
const dotenv = require('dotenv');
dotenv.config();
const server = require('../../server');
const mongoose = require('mongoose');
const rp = require('request-promise');
module.exports = {
    context: { api:'/api/v1', email: 'admin@gmail.com', name: 'Test User', password: '12345678' },
};