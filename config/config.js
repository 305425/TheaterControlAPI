'use strict';

const Confidence = require('confidence');
const Fs = require('fs');
const Path = require('path');

// Confidence criteria 
let internals = {
    criteria: {
        env: process.env.NODE_ENV
    }
};
//  Confidence document object
internals.config = {
    $meta: 'App configuration file',
    tlsOptions: {
        key: Fs.readFileSync(Path.join(__dirname, 'ssl/key.pem'), 'utf8'),
        cert: Fs.readFileSync(Path.join(__dirname, 'ssl/cert.pem'), 'utf8')
    },
    baseUrl: {
        $filter: 'env',
        $meta: 'values should not end in "/"',
        production: 'http://localhost:8080',
        $default: 'http://127.0.0.1:8080'
    },
    mongoose: {
        $filter: 'env',
        production: {
            uri: process.env.DATABASE_URL
        },
        test: {
            uri:'mongodb://localhost:27017/testdb'
        },
        $default: {
            uri: process.env.DATABASE_URL,
            options: {}
        }
    },
    jwtAuthOptions: {
        key: process.env.JWT_SECRET,
        algorithm: 'HS256'
    }
};

internals.store = new Confidence.Store(internals.config);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};

exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};
