'use strict';
const Mongoose = require('mongoose');
const Ticket = Mongoose.model('Ticket');

exports.getRevinueByAggregation = async function (request) {
    return new Promise(async function (resolve, reject) {

        var monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var pipeline = [
            {
                "$match": {
                    "creationDate": { "$gte": request.payload.startDate, "$lte": request.payload.endDate }
                }
            },
            {
                "$group": {
                    "_id": {
                        "year": { "$year": "$creationDate" },
                        "month": { "$month": "$creationDate" }
                    },
                    "summaryProfit": { "$sum": "$ticketPrice" },
                }
            },
            {
                "$addFields": {
                    "month": {

                        "$arrayElemAt": [monthNames, '$_id.month']
                    }
                }
            },
            { "$sort": { "_id.month": 1 } }
        ]

        await Ticket.aggregate(pipeline, (err, data) => {
            if (err) {
                return reject(err);
            }
            if (!data || !data.length) {
                return resolve({ statusCode: 422, message: 'No data in the collection for given inputs', data: [] });
            }
            return resolve({ statusCode: 200, message: 'Revinue retrieved successfully', revinue: data });
        })
    });
};

exports.getRevinueByJsAlgorithm = async function (request) {
    var groupBy = function (collection, key) {
        return collection.reduce(function (rv, x) {
            console.log("record", x[key])
                ;
            let newKey = `${new Date(x[key]).toLocaleString('default', { month: 'long' })}-${new Date(x[key]).getFullYear()}`;
            (rv[newKey] = rv[newKey] || []).push(x);
            return rv;
        }, {});
    };
    return new Promise(async function (resolve, reject) {
        await Ticket.find({
            creationDate: {
                $gte: request.payload.startDate,
                $lte: request.payload.endDate
            }
        }, (err, data) => {
            if (err) {
                return reject(err);
            }
            if (!data) {
                return resolve({ statusCode: 422, message: 'No data in the collection', data: [] });
            }
            var groupByData = groupBy(data, "creationDate");
            var result = [];
            Object.keys(groupByData).forEach(key => {
                let summaryProfit = groupByData[key].reduce((acc, val) => { return acc + val.ticketPrice; }, 0)
                result.push({ month: key, summaryProfit })
            })
            return resolve({ statusCode: 200, message: 'Revinue retrieved successfully', revinue: result });
        })
    });
};

exports.getVisitsByAggregation = async function (request) {
    return new Promise(async function (resolve, reject) {
        var monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var pipeline = [
            {
                "$match": {
                    "creationDate": { "$gte": request.payload.startDate, "$lte": request.payload.endDate }
                }
            },
            {
                "$group": {
                    "_id": {
                        "year": { "$year": "$creationDate" },
                        "month": { "$month": "$creationDate" }
                    },
                    "summaryVisits": { "$sum": 1 },
                }
            },
            {
                "$addFields": {
                    "month": {

                        "$arrayElemAt": [monthNames, '$_id.month']
                    }
                }
            },
            { "$sort": { "_id.month": 1 } }
        ]
        await Ticket.aggregate(pipeline, (err, data) => {
            if (err) {
                return reject(err);
            }
            if (!data) {
                return resolve({ statusCode: 422, message: 'No data in the collection', data: [] });
            }
            return resolve({ statusCode: 200, message: 'Visits retrieved successfully', visits: data });
        })
    });
};

exports.getVisitsByJsAlgorithm = async function (request) {
    var groupBy = function (collection, key) {
        return collection.reduce(function (rv, x) {
            console.log("record", x[key]);
            let newKey = `${new Date(x[key]).toLocaleString('default', { month: 'long' })}-${new Date(x[key]).getFullYear()}`;
            (rv[newKey] = rv[newKey] || []).push(x);
            return rv;
        }, {});
    };
    return new Promise(async function (resolve, reject) {
        await Ticket.find({
            creationDate: {
                $gte: request.payload.startDate,
                $lte: request.payload.endDate
            }
        }, (err, data) => {
            if (err) {
                return reject(err);
            }
            if (!data) {
                return resolve({ statusCode: 422, message: 'No data in the collection', data: [] });
            }
            var groupByData = groupBy(data, "creationDate");
            var result = [];
            Object.keys(groupByData).forEach(key => {
                let summaryVisits = groupByData[key].length;
                result.push({ month: key, summaryVisits })
            })
            return resolve({ statusCode: 200, message: 'Visits retrieved successfully', visits: result });
        })
    });
};