/**
 * Created by arminhammer on 10/29/15.
 */
'use strict';

var AWS = require('aws-sdk');
var P = require('bluebird');
var s3 = P.promisifyAll(new AWS.S3());
var request = P.promisifyAll(require('request'));

var env_params = {
    Bucket: 'env.dcfahrt.com',
    Key: 'dcfahrt.env.json'
};

exports.handler = function(event, context) {
    var scope = {};
    s3
        .getObjectAsync(env_params)
        .then(function(envData) {
            console.log('Received env data.');
            scope.env = JSON.parse(envData.Body.toString());
            scope.apiParams = {
                url: 'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All',
                headers: {
                    'api_key': scope.env.WMATA_API_KEY
                }
            };
        })
        .then(function() {
            //console.log(scope);
            var count = 0;
            //console.log(context);
            //console.log(context.getRemainingTimeInMillis());
            function loop() {
                if(count < 7) {
                    count++;
                    console.log('Looping...'+count);
                    setTimeout(loop, 1000);
                } else {
                    //console.log('Finished executing, closing.');
                    context.succeed('Finished.');
                }
            }
            setTimeout(loop, 1000);
            //context.done();
        })
      /*
        .then(request.getAsync(scope.apiParams))
        .then(function(response, body) {
            console.log(scope);
            console.log('Received response ' + response.statusCode);

            var apiData = JSON.parse(body);
            apiData.timestamp = Date.now();

            console.log(apiData.timestamp);

            var cacheParams = {
                Bucket: env.S3_CACHE_BUCKET,
                Key: 'dcrailprediction.json',
                ACL: 'public-read',
                Body: JSON.stringify(apiData)
            };

            s3.putObject(cacheParams, function(err, s3Data) {
                if(err) {
                    console.log('There was an error: ' + err);
                    context.done('There was an error: ' + err);
                }
                else {
                    console.log('Refreshed the rail prediction cache.');
                    context.done('Uploaded to S3.');
                }
            });

        })
        */
        .catch(function(error) {
            context.fail(error);
        });
        //context.done();
};
