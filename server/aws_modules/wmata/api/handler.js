'use strict';

/**
 * AWS Module: Action: Lambda Handler
 * "Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent"
 */

require('jaws-core-js/env');
var https = require('https');

// Modularized Code
//var action = require('./index.js');

// Lambda Handler
module.exports.handler = function(event, context) {

    var options = {
        hostname: 'api.wmata.com',
        path: '/StationPrediction.svc/json/GetPrediction/All',
        headers: {
            api_key: process.env['WMATA_API_KEY']
        }
    };

    https.get(options, function(res) {
        context.succeed(res.statusCode);
    }).on('error', function(e) {
        return context.fail(e);
    });
};
