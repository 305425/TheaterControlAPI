'use strict';

var Boom = require('boom');
var JWT   = require('jsonwebtoken');
const Joi = require('joi');
const Config = require('../../config/config');

/* ================================== Controllers for V1 ============================== */

exports.getAuthToken = {
    description: 'jwt token',
    auth : false,
    validate: {
        payload: {
            email: Joi.string().min(3).email().required(),
            password: Joi.string().min(5).required()
        },
         failAction: (request, h, error) => {
            
            return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
        }
    },
    handler: async (request, h) => {
          try {
            let secret = Config.get('/jwtAuthOptions/key');
                let obj = {
                    userId : request.payload.email
                }; // object info you want to sign
                let jwtToken = JWT.sign(obj, secret, { expiresIn: '1 day' });
                var response = h.response({ message : 'Successfully logged-in', token : jwtToken });
                response.header('Authorization', jwtToken);
                response.code(200);
                return response;         
          } catch (error) {
             return error.message;
          }  
    },
    tags: ['api'] //swagger documentation
};

/* ================================== Controllers for V2 ============================== */
