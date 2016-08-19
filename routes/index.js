var express = require('express');
var app = require('express')();
var router = express.Router();
var bodyParser = require('body-parser');
var brain = require('brain')
app.use(bodyParser.json()); // for parsing application/json
router.post('/', function(req, res, next) {
  console.log(req.body.emotiondata),

  res.send(req.body);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


var net = new brain.NeuralNetwork();
module.exports = router;
