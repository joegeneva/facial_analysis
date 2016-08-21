var express = require('express');
var app = require('express')();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
var synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

trainingopts = {
        rate: .3,
        iterations: 1,
        error: .2,
        shuffle: false,
        log: 1000,
        cost: Trainer.cost.MSE
    }

    //this works! no resetting!
var myNetwork = new Architect.Perceptron(142, 71, 35,1);


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

router.post('/train', function(req, res, next) {
  var array = JSON.parse(req.body.posarray);
  var traindata = makeinput(req.body.emotion,array);
  res.send(trainer.train([traindata],trainingopts));
});


function makeinput(emotion,array){
  var arrpack = [];
  array.forEach(function(currentValue,index){
    arrpack.push(currentValue[0]/1000);
    arrpack.push(currentValue[1]/1000);
  });
  //emopack = [0,0,0,0,0,0,0];
  emopack = [emotion];
  //emopack[emotion] = 1;
  pack = {};
  pack.input = arrpack;
  pack.output = emopack;
  return pack;
  //trainingSet = [{input: [0,0],output: [0]}]
}

module.exports = router;
