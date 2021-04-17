var faker = require('faker');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: process.env.DB_HOST || 'mymysql',
  user: 'root',
  password: 'root',
  database: 'redis_test',
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);

  seedDb();
});

var seedDb = async function () {
  for (let i = 0; i < 1000; i++) {
    var wordDef = makeWordAndDef();
    await loadWord(wordDef);
  }
  console.log('done!');
  connection.end();
};

/**
 *
 * @param {Array<string>} word - array of [word, def]
 * @returns Promise
 */
var loadWord = function (wordDefArray) {
  return new Promise((resolve) => {
    connection.query(
      'insert into words (word, definition) values (?, ?) on duplicate key update word=?, definition=?',
      [...wordDefArray, ...wordDefArray],
      (err, res) => {
        if (err) {
          console.log('err in loadWord', err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

var makeWordAndDef = function () {
  var word = faker.fake('{{random.word}}::{{random.words(5)}}');
  return word.toLowerCase().split('::');
};
