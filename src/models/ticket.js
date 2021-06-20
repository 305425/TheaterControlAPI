'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

var TicketSchema = new Schema({
    customerName: {
        type: String,
        trim: true,
    },
    performanceTitle: {
        type: String,
        trim: true,
    },
    performanceTime: {
        type: String,
    },
    ticketPrice: {
        type: Number
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});
Mongoose.model('Ticket', TicketSchema);