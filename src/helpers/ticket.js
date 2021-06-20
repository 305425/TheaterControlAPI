'use strict';
const Mongoose = require('mongoose');
const Ticket = Mongoose.model('Ticket');

exports.createTicket = async function (ticketData) {
    return new Promise(async function (resolve, reject) {
        try {
             let ticket = new Ticket(ticketData);
             let savedTicket = await ticket.save();
             return resolve({statusCode : 201, message : 'Ticket created successfully', ticket : savedTicket});
          }
        catch (error) {
            return reject(error);
        }
    });
};

exports.getAllTickets = async function () {
    return new Promise(async function (resolve, reject) {
        await Ticket.find({},(err,tickets)=>{
            if (err){
                return reject(error);
            }
            if (!tickets){
                return resolve({statusCode : 422, message : 'No data in the collection', tickets : []});
            }
            return resolve({statusCode : 200, message : 'All tickets retrieved successfully', tickets : tickets});
        })
    });
};

exports.updateTicket = async function (req) {
    return new Promise(async function (resolve, reject) {
        let requestPayload= {...req.payload, updatedDate:Date.now()}
        await Ticket.findByIdAndUpdate(req.params.id,requestPayload,{new: true},(err,ticket)=>{
            if (err){
                return reject(err);
            }
            if (!ticket){
                return resolve({statusCode :404, message : 'No ticket exists for given id', ticket : {}});
            }
            return resolve({statusCode : 200, message : 'Ticket updated successfully', ticket : ticket});
        })
    });
};

exports.deleteTicket = async function (id) {
    return new Promise(async function (resolve, reject) {
        await Ticket.findByIdAndRemove(id,(err,ticket)=>{
            if (err){
                return reject(error);
            }
            if (!ticket){
                return resolve({statusCode :404, message : 'No ticket exists for given id'});
            }
            return resolve({statusCode : 200, message : 'Ticket deleted successfully'});
        })
    });
};