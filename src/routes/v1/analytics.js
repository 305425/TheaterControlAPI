'use strict';

exports.plugin = {  
    pkg: require('../../../package.json'),
    name : 'analytics_routes_v1',
    register: async (server, options) => {
        const Controllers = {
            ticket: require('../../controllers/analytics')
        };
        const basePath = '/api/v1/analytics';
        server.route([
            {
                method: 'POST',
                path: basePath + '/revinue',
                config: Controllers.ticket.getRevinue
            },
            {
                method: 'POST',
                path: basePath + '/visited',
                config: Controllers.ticket.getVisits
            }
        ]);
    }
};
