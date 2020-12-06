var express = require('express');
var morgan = require('morgan');
var PORT = 3000;

var app = express();
app.use(morgan("dev"));

app.get('/lookup/:word', function(req, res) {
  console.log(`got request for ${req.params.word}`);
  res.sendStatus(200);
})

app.listen(PORT, function() {
  console.log(`app listening on port ${PORT}`);
})
