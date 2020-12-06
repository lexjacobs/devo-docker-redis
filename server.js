var express = require('express');
var morgan = require('morgan');
var PORT = 3000;
var db = require('./db');

var app = express();
app.use(morgan("dev"));

app.get('/lookup/:word', function(req, res) {
  var {word} = req.params;
  console.log(`got request for ${word}`);
  db.find(word, function(err, data) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(JSON.stringify(data));
    }
  })
})

app.listen(PORT, function() {
  console.log(`app listening on port ${PORT}`);
})
