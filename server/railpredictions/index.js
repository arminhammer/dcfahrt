/**
 * Created by arminhammer on 10/29/15.
 */

'use strict';

var AWS = require('aws-sdk');
var request = require('request');
//var bluebird = require('bluebird');

var s3 = new AWS.S3();

var env_params = {
    Bucket: 'env.dcfahrt.com',
    Key: 'dcfahrt.env.json'
};

exports.handler = function(event, context) {

    s3.getObject(env_params, function(err, envData) {
        if(err) context.fail(err);
        else {
            console.log('Received env data.');
            console.log(envData);
            var WMATA_API_KEY = JSON.parse(envData.Body.toString()).WMATA_API_KEY;
            console.log(WMATA_API_KEY);

            var options = {
                url: 'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All',
                headers: {
                    'api_key': WMATA_API_KEY
                }
            };

            request(options, function(error, response, body) {

                if(error) {
                    console.log('There was an error: ' + error);
                    context.fail(error)
                } else {
                    console.log('Received response ' + response.statusCode);
                    console.log(body);
                    context.done("Finished.");
                }

            });


            //context.done();
        }
    });

    /*
    if (!event.cmd) {
        context.fail('Please specify a command to run as event.cmd');
        return;
    }
    child = exec(event.cmd, function(error) {
        // Resolve with result of process
        context.done(error, 'Process complete!');
    });

    // Log process stdout and stderr
    child.stdout.on('data', console.log);
    child.stderr.on('data', console.error);
    */

};

// Lambda Handler
/*module.exports.handler = function(event, context) {



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
    */