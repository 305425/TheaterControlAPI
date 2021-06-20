'use strict';

const Confidence = require('confidence');
const Config = require('./config');
const Meta = require('./meta');
const Pack = require('../package');

let internals = {
    criteria: {
        env: process.env.NODE_ENV
    }
};

internals.manifest = {
    $meta: 'App manifest document',
    server: {
        host : process.env.SERVER_HOST,
        port: process.env.PORT
    },
    register: {
        plugins : [
        //**************************************************************
        //                                                             *
        //                      COMMON PLUGINS                         *
        //                                                             *
        //**************************************************************

        // App context decorator
        {
            plugin: './lib/context',
            options: {
                meta: Meta.get('/')
            }
        },
        //  MongoDB connector 
        {
            plugin : './lib/mongoose',
            options: Config.get('/mongoose')
            
        },
        // Static file and directory handlers
        {
            plugin: 'inert'
        },
        {
            plugin: 'vision'
        },
        // Swagger support 
        {
            plugin: 'hapi-swagger',
            options: {
                    info: {
                        title: 'Theater Control API Documentation',
                        version: Pack.version,
                    },
                    host: process.env.SWAGGER_HOST,
                    securityDefinitions: {
                        'jwt': {
                            'type': 'apiKey',
                            'name': 'Authorization',
                            'in': 'header'
                        }
                    },
                    security: [{ 'jwt': [] }]
                }
        },

        //**************************************************************
        //                                                             *
        //                      API PLUGINS                            *
        //                                                             *
        //**************************************************************

        // JWT authentication
        {
            plugin: 'hapi-auth-jwt2',
        },
        //  JWT-Authentication strategy
        {
            plugin:  './lib/jwtAuth',
            options: Config.get('/jwtAuthOptions')
        },
    
        // //**************************************************************
        // //                                                             *
        // //                      APPLICATION ROUTES                     *
        // //                                                             *
        // //**************************************************************
        
       

        /* ----------------- Start  api routes -------------- */
            /* Version v1 apis */
        {
            plugin: './src/routes/v1/ticket.js'
        },
        {
            plugin: './src/routes/v1/analytics.js'
        },
        {
            plugin: './src/routes/v1/auth.js'
        }
        /* ----------------- End api routes -------------- */
        ]
    }
};
internals.store = new Confidence.Store(internals.manifest);
exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};
exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};
