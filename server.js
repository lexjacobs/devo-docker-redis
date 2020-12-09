var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var PORT = 3000;
var db = require('./db');
var red = require('./redis');

var app = express();
app.use(morgan("dev"));
app.use(express.json());

app.get('/red/:word', function (req, res) {
  var { word } = req.params;
  console.log(`got request for ${word}`);
  red.get(word, function (err, data) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(data ? data.toString() : 'null');
      // res.send(JSON.stringify(data));
    }
  })
});

app.get('/define/:word', function(req, res) {
  var {word} = req.params;
  console.log(`got request for ${word}`);
  db.get(word, function(err, data) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(JSON.stringify(data));
    }
  })
})

app.post('/define', function(req, res) {
  var {word, definition} = req.body;
  db.set(word, definition, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  })
})

app.listen(PORT, function() {
  console.log(`app listening on port ${PORT}`);
})
