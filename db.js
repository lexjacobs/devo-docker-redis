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
module.exports = db;
