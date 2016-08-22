var express = require('express');
var app = require('express')();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
var fs = require('fs');
var divby = 250;
//DEBUG=myapp:* npm start

var file = 'data.json';

router.post('/save', function(req, res, next) {
  //console.log("1");
  var array = JSON.parse(req.body.posarray);
  //console.log("2");
  var traindata = makeinput(req.body.emotion,array);
  //console.log("3");
  //var obj = myNetwork.toJSON();
  //res.send(["saved"]);
  fs.appendFile("/tmp/test.json",  JSON.stringify(traindata) + '\n', function(err) {
if(err) {
        console.log(err);
    }
})


    console.log("The file was saved!");
  res.send(["works"]);
});

router.post('/load', function(req, res, next) {
  //var obj = {};
    //console.dir(obj);
    //var fs = require('fs');
   
  fs.readFile("/tmp/test.json",'utf8', function(err,data) {
if(err) {
        return console.log(err);
    }
    console.log(data);
    res.send([data]);
})

  //myNetwork = Network.fromJSON(obj);
  //console.log(myNetwork.toJSON());
  
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
  //console.log("5");
  //console.log(array);
  //console.log(6);
  array.forEach(function(currentValue,index){
    //console.log(currentValue);
    //console.log(7);
    //console.log(currentValue[0]);
    //console.log(8);
    //console.log(divby);
    //console.log(9);
    //console.log(currentValue[0]/divby);
    arrpack.push(currentValue[0]/divby);
    arrpack.push(currentValue[1]/divby);
  });
  //console.log("4");
  emopack = [0,0,0,0,0,0,0];
  //emopack = [emotion];
  console.log("heeeeyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  console.log(emotion);
  emopack[emotion] = 1;
  pack = {};
  pack.input = arrpack;
  pack.output = emopack;
  return pack;
  //trainingSet = [{input: [0,0],output: [0]}]
}

module.exports = router;
