var express = require('express');
var app = require('express')();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var fs = require('fs');
var divby = 250;
var filename = "/home/joe/test.json";
//DEBUG=myapp:* npm start

router.post('/save', function(req, res, next) {
  var array = JSON.parse(req.body.posarray);
  var traindata = makeinput(req.body.emotion,array);
  fs.appendFile(filename,  JSON.stringify(traindata) + '\n', function(err) {
    if(err) {
            console.log(err);
        }
    })
  res.send(["File saved"]);
});

router.post('/load', function(req, res, next) {
  fs.readFile(filename,'utf8', function(err,data) {
    if(err) 
    {
      return console.log(err);
    }
    console.log(data);
  })
  res.send(['loaded']);  
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

function makeinput(emotion,array){
  var arrpack = [];
  array.forEach(function(currentValue,index){
    arrpack.push(currentValue[0]/divby);
    arrpack.push(currentValue[1]/divby);
  });
  emopack = [0,0,0,0,0,0,0];
  console.log(emotion);
  emopack[emotion] = 1;
  pack = {};
  pack.input = arrpack;
  pack.output = emopack;
  return pack;
  //trainingSet = [{input: [0,0],output: [0]}]
}

module.exports = router;
