var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'redis_test'
});
db.connect();
db.on('connect', function() {
  console.log('db connected');
});

db.set = function(word, definition, cb) {
  // INSERT INTO table (id, name, age) VALUES(1, "A", 19) ON DUPLICATE KEY UPDATE
  // name = "A", age = 19
  db.query('INSERT INTO words (word, definition) VALUES (?, ?) on duplicate key update word=?, definition=?', [word, definition, word, definition], function(err, result) {
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  });
};

db.get = function(word, cb) {
  db.query('select * from words where word = ?', word, function(err, result) {
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  });
};

module.exports = db;
