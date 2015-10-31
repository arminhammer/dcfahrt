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
            scope.env = JSON.parse(envData.Body.toString());
            scope.apiParams = {
                url: 'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All',
                headers: {
                    'api_key': scope.env.WMATA_API_KEY
                }
            };
        })
        .then(function() {
            var loopCount = 0;
            function updateS3() {
                if(loopCount < 3) {
                    loopCount++;
                    request
                        .getAsync(scope.apiParams)
                        .then(function(response, body) {
                            var apiData = JSON.parse(response.body);
                            apiData.timestamp = Date.now();
                            scope.cacheParams = {
                                Bucket: scope.env.S3_CACHE_BUCKET,
                                Key: 'dcrailprediction.json',
                                ACL: 'public-read',
                                Body: JSON.stringify(apiData)
                            };
                        })
                        .then(function() {
                            if(scope.cacheParams) { s3.putObjectAsync(scope.cacheParams)}
                        })
                        .then(function() { setTimeout(updateS3, 1000); })
                        .catch(function(e) { context.fail(e); })
                } else { context.succeed('Finished.'); }
            }
            setTimeout(updateS3, 1000);
        })
        .catch(function(error) { context.fail(error); });
};
