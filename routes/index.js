var express = require('express');
var app = require('express')();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
var jsonfile = require('jsonfile');
const fs = require('fs');
//DEBUG=myapp:* npm start

var file = 'data.json';

router.post('/save', function(req, res, next) {
  var obj = myNetwork.toJSON();

  jsonfile.writeFile(file, obj, function (err) {
    console.error(err);
  })
  res.send(["saved"]);
});

router.post('/load', function(req, res, next) {
  var obj = {};
  console.dir(jsonfile.readFileSync(file));
  jsonfile.readFile(file, function(err, obj) {
    console.error(err);
    //console.dir(obj);
  })

  myNetwork = Network.fromJSON(obj);
  console.log(myNetwork.toJSON());
  res.send(["loaded"]);
});

router.post('/delete', function(req, res, next) {
  fs.unlinkSync('data.json');
  console.log('successfully deleted data.json');
  res.send(["deleted"]);
});





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



module.exports = router;
