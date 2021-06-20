'use strict';

exports.plugin = {  
    pkg: require('../../../package.json'),
    name : 'ticket_routes_v1',
    register: async (server, options) => {
        const Controllers = {
            ticket: require('../../controllers/ticket')
            
        };
        const basePath = '/api/v1/ticket/';
        server.route([
            {
                method: 'POST',
                path: basePath + 'create',
                config: Controllers.ticket.createTicket
            },
            {
                method: 'GET',
                path: basePath + 'alltickets',
                config: Controllers.ticket.getTickets
            },
            {
                method: 'PUT',
                path: basePath + 'updateticket/{id}',
                config: Controllers.ticket.updateTicket
            },
            {
                method: 'DELETE',
                path: basePath + 'deleteticket/{id}',
                config: Controllers.ticket.deleteTicket
            }
        ]);
    }
};
