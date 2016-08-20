var express = require('express');
var app = require('express')();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
var jsonfile = require('jsonfile');
const fs = require('fs');
//DEBUG=myapp:* npm start

var file = 'data.json';

var synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

//this works! no resetting!
var myNetwork = new Architect.Perceptron(142, 71, 35, 17,7);


var trainer = new Trainer(myNetwork);
router.post('/newnn', function(req, res, next) {
  myNetwork.reset();
  res.send(["newnn"]);
});
router.post('/test', function(req, res, next) {
  var array = JSON.parse(req.body.posarray);
  var traindata = makeinput(req.body.emotion,array);
  res.send(trainer.test([traindata]));
});

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


router.post('/activate', function(req, res, next) {
  var array = JSON.parse(req.body.posarray);
  array = [].concat.apply([], array);
  var cleanarr = [];
  array.forEach(function(currentValue,index){
    cleanarr.push(currentValue/1000);
  });
  //console.log(array);
  var netoutput = myNetwork.activate(cleanarr);
  res.send(netoutput);
});

router.post('/', function(req, res, next) {
  var array = JSON.parse(req.body.posarray);
  var traindata = makeinput(req.body.emotion,array);
  res.send(trainer.train([traindata]));
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

function makeinput(emotion,array){
  var arrpack = [];
  array.forEach(function(currentValue,index){
    arrpack.push(currentValue[0]/1000);
    arrpack.push(currentValue[1]/1000);
  });
  emopack = [0,0,0,0,0,0,0];
  emopack[emotion] = 1;
  pack = {};
  pack.input = arrpack;
  pack.output = emopack;
  return pack;
  //trainingSet = [{input: [0,0],output: [0]}]
}


module.exports = router;
