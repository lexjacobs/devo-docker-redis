var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'redis_test'
});
db.connect();
db.on('connect', function() {
  console.log('db connected')
});

db.set = function(word, definition, cb) {
  var result = db.query('INSERT INTO words (word, definition) VALUES (?, ?)', [word, definition], function(err, result) {
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  });
};

db.get = function(word, cb) {
  var result = db.query('select * from words where word = ?', word, function(err, result) {
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  });
};

module.exports = db;
