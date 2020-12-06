var redis = require('redis');
var rclient = redis.createClient();
rclient.on('connect', function() {
  console.log('connected to redis');
})
module.exports = rclient;
