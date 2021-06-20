'use strict';
var Boom = require('boom');
var JWT   = require('jsonwebtoken');
const Joi = require('joi');
const Config = require('../../config/config');
const Mongoose = require('mongoose');
const Ticket = Mongoose.model('Ticket');
const ticketHelper = require('../helpers/ticket');

/* ================================== Controllers for V1 ============================== */

exports.createTicket = {
    description: 'Create a ticket',
    auth : 'jwt',
    validate: {
        payload: {
            ticketPrice: Joi.number().required(),
            performanceTitle: Joi.string().required(),
            performanceTime:Joi.string().required(),
            customerName: Joi.string().required()
        },
         failAction: (request, h, error) => {
            
            return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
        }
    },
    handler: async (request, h) => {
          try {
            let data = await ticketHelper.createTicket(request.payload);
            if (data.statusCode === 201) {
                var response = h.response({ message : data.message, ticket : data.ticket });
                response.code(201);
                return response;
            } else {
                // User not found in database
                return h.response({ message: data.message}).code(data.statusCode);  
            } 
          } catch (error) {
             return error.message;
          }  
    },
    tags: ['api'] //swagger documentation
};
exports.updateTicket = {
    description: 'Update a ticket',
    auth : 'jwt',
    validate: {
        params: Joi.object({
            id: Joi.string().required()
        }),
        payload: {
            ticketPrice: Joi.number(),
            performanceTitle: Joi.string(),
            performanceTime:Joi.string(),
            customerName: Joi.string()
        },
         failAction: (request, h, error) => {
            
            return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
        }
    },
    handler: async (request, h) => {
          try {
            let data = await ticketHelper.updateTicket(request);
            if (data.statusCode === 200) {
                var response = h.response({ message : data.message, ticket : data.ticket });
                response.code(200);
                return response;
            } else {
                // User not found in database
                return h.response({ message: data.message}).code(data.statusCode);  
            } 
          } catch (error) {
             return error.message;
          }  
    },
    tags: ['api'] //swagger documentation
};
exports.deleteTicket = {
    description: 'Delete a ticket',
    auth : 'jwt',
    validate: {
        params: Joi.object({
            id: Joi.string().required()
        }),
      
         failAction: (request, h, error) => {
            
            return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
        }
    },
    handler: async (request, h) => {
          try {
            let data = await ticketHelper.deleteTicket(request.params.id);
            if (data.statusCode === 200) {
                var response = h.response({ message : data.message });
                response.code(200);
                return response;
            } else {
                // User not found in database
                return h.response({ message: data.message}).code(data.statusCode);  
            } 
          } catch (error) {
             return error.message;
          }  
    },
    tags: ['api'] //swagger documentation
};
exports.getTickets = {
    description: 'Get all tickets',
    auth : 'jwt',
    handler: async (request, h) => {
          try {
            let data = await ticketHelper.getAllTickets();
            if (data.statusCode === 200) {
                var response = h.response({ message : data.message, tickets : data.tickets });
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

/* ================================== Controllers for V2 ============================== */