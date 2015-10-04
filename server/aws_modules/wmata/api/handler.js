'use strict';

/**
 * AWS Module: Action: Lambda Handler
 * "Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent"
 */

require('jaws-core-js/env');
var AWS = require('aws-sdk');
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
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            var s3 = new AWS.S3();

            var params = {
                Bucket: process.env['S3_CACHE_BUCKET'],
                Key: 'dcrailprediction.json',
                ACL: 'public-read',
                Body: body
            };

            s3.putObject(params, function(err, s3Data) {
               if(err) context.fail(err);
                else {
                   context.succeed('Uploaded to S3.');
               }
            });
        });
    }).on('error', function(e) {
        return context.fail(e);
    });
};
