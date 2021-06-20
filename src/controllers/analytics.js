'use strict';
var Boom = require('boom');
var JWT   = require('jsonwebtoken');
const Joi = require('joi');
const Config = require('../../config/config');
const Mongoose = require('mongoose');
const Ticket = Mongoose.model('Ticket');
const ticketHelper = require('../helpers/analytics');

/* ================================== Controllers for V1 ============================== */
exports.getRevinue = {
    description: 'Get revinue',
    auth : 'jwt',
    validate: {
        query: Joi.object({
            method: Joi.string().valid('aggregation', 'algorithm').required()
        }),
        payload: {
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
        },
         failAction: (request, h, error) => {
            
            return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
        }
    },
    handler: async (request, h) => {
          try {
            console.log("query", request.query)
            let data = request.query.method==="aggregation"? await ticketHelper.getRevinueByAggregation(request)
            : await ticketHelper.getRevinueByJsAlgorithm(request);
            if (data.statusCode === 200) {
                var response = h.response({ message : data.message, revinue : data.revinue });
                response.code(200);
                return response;
            } else {
                return h.response({ message: data.message}).code(data.statusCode);  
            } 
          } catch (error) {
             return error.message;
          }  
    },
    tags: ['api'] //swagger documentation
};

exports.getVisits = {
    description: 'Get visits',
    auth : 'jwt',
    validate: {
        query: Joi.object({
            method: Joi.string().valid('aggregation', 'algorithm').required()
        }),
        payload: {
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
        },
         failAction: (request, h, error) => {
            
            return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
        }
    },
    handler: async (request, h) => {
          try {
            let data = request.query.method==="aggregation"? await ticketHelper.getVisitsByAggregation(request)
            : await ticketHelper.getVisitsByJsAlgorithm(request);
            if (data.statusCode === 200) {
                var response = h.response({ message : data.message, revinue : data.revinue });
                response.code(200);
                return response;
            } else {
                return h.response({ message: data.message}).code(data.statusCode);  
            } 
          } catch (error) {
             return error.message;
          }  
    },
    tags: ['api'] //swagger documentation
};
