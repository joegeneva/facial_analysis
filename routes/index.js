var express = require('express');
var app = require('express')();
var router = express.Router();
var bodyParser = require('body-parser');
var brain = require('brain')
app.use(bodyParser.json()); // for parsing application/json
var jsonfile = require('jsonfile')
const fs = require('fs');


var file = 'data.json'

var synaptic = require('synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

//this shit works! no resetting!
//var myNetwork = new Architect.Perceptron(142, 71, 35, 17,7);
var myNetwork = new Architect.LSTM(142,70,7);


var trainer = new Trainer(myNetwork)

router.post('/test', function(req, res, next) {
  var array = JSON.parse(req.body.posarray);
  var traindata = makeinput(req.body.emotion,array);
  res.send(trainer.test([traindata]));
});

router.post('/save', function(req, res, next) {
  var obj = myNetwork.toJSON();

  jsonfile.writeFile(file, obj, function (err) {
    console.error(err)
  })
  res.send(["saved"]);
});

router.post('/load', function(req, res, next) {
  var obj = {};
  console.dir(jsonfile.readFileSync(file))
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
  res.send(["deleted"])
});


router.post('/activate', function(req, res, next) {
  var array = JSON.parse(req.body.posarray);
  array = [].concat.apply([], array);
  //console.log(array);
  var netoutput = myNetwork.activate(array);
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
    arrpack.push(currentValue[0]);
    arrpack.push(currentValue[1]);
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
