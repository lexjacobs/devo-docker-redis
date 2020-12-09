var redis = require('redis');
var rclient = redis.createClient();
rclient.on('connect', function() {
  console.log('connected to redis');
})
var red = {};

red.set = function(key, value, cb) {
  rclient.set(key, value, function(err, res) {
    if(err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
}
red.get = function(key, cb) {
  rclient.get(key, function(err, res) {
    cb(null, res);
  });
}

red.flush = function(key, cb) {
  rclient.del(key, function(res) {
    cb(null, res);
  })
}

module.exports = red;
