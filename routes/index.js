var express = require('express');
var app = require('express')();
var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
router.post('/', function(req, res, next) {
  console.log("i ran"),
  res.send(req.body);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



module.exports = router;
