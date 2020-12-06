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

db.find = function(letter, cb) {
  var result = db.query('select * from words where letter = ?', letter, function(err, result) {
    console.log(err, result)
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  })
}

module.exports = db;
