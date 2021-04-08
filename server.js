var express = require('express');
var morgan = require('morgan');
var PORT = process.env.PORT || 3030;
var db = require('./db');
var red = require('./redis');

var app = express();
app.use(morgan('dev'));
app.use(express.json());

app.get('/red/:word', function (req, res) {
  var { word } = req.params;
  red.get(word, function (err, data) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(data ? data.toString() : 'null');
      // res.send(JSON.stringify(data));
    }
  });
});

app.get('/define/:word', function(req, res) {
  var {word} = req.params;
  // check redis for word
  red.get(word, function(err, redResponse) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    // if present, return cached value
    if (redResponse !== null) {
      res.json({definition: redResponse, word, source: 'reddis'});
      return;
    } else {
      db.get(word, function(err, data) {
        if (err) {
          res.sendStatus(404);
        } else {
          if (data.length === 0) {
            res.json({word, definition: 'not defined', source: 'mysql'});
            return;
          }
          // cache in redis
          let result = data[0];
          red.set(word, result.definition, function() {
            delete result.id;
            res.json(Object.assign(result, {source: 'mysql'}));
          });
        }
      });

    }
  });


});

app.post('/define', function(req, res) {
  var {word, definition} = req.body;
  // delete redis key
  red.flush(word, function(err) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    db.set(word, definition, function (err) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });

  });


});

app.listen(PORT, function() {
  console.log(`app listening on port ${PORT}`);
});
