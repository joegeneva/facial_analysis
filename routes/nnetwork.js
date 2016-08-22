var express = require('express');
var app = require('express')();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
var synaptic = require('synaptic');
var divby = 250;
var filename = "/home/joe/test.json";
//DEBUG=myapp:* npm start


var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

trainingopts = {
        rate: .01,
        iterations: 100,
        error: .005,
        shuffle: true,
        log: 10,
        cost: Trainer.cost.MSE
    }

    //this works! no resetting!
var myNetwork = new Architect.Perceptron(112, 80,7);



//trainer does propagate much better then you.

var trainer = new Trainer(myNetwork);
router.post('/newnn', function(req, res, next) {
  myNetwork.reset();
  res.send(["newnn"]);
});
router.post('/test', function(req, res, next) {
  var array = JSON.parse(req.body.posarray);
  var traindata = makeinput(req.body.emotion,array);
  res.send(mytrainer.test([traindata]));
});


router.post('/activate', function(req, res, next) {
  var array = JSON.parse(req.body.posarray);
  array = [].concat.apply([], array);
  var cleanarr = [];
  array.forEach(function(currentValue,index){
    cleanarr.push(currentValue/divby);
  });
  //console.log(array);
  var netoutput = myNetwork.activate(cleanarr);
  res.send(netoutput);
});

router.post('/filetrain', function(req, res, next) {
  //var array = JSON.parse(req.body.posarray);
  //var traindata = makeinput(req.body.emotion,array);
  //res.send(trainer.train([traindata],trainingopts));
});


router.post('/train', function(req, res, next) {
  var fs = require('fs');
  console.log("req");
  console.log(req.url);
  /*var traindata;
  fs.readFile("/tmp/test.json",'utf8', function(err,data) {
if(err) {
        return console.log(err);
    }*/
var filePath = filename;
var stream = fs.createReadStream(filePath, {flags: 'r', encoding: 'utf-8'});
var buf = '';
var traindata = [];
stream.on('data', function(d) {
    buf += d.toString(); // when data is read, stash it in a string buffer
    pump(); // then process the buffer
    //console.log('before train');
//console.log(traindata);

traindata = [].concat.apply([], traindata);
console.log(traindata.length);
console.log('space');
//console.log(traindata);

  
});
stream.on('end', function() {
   console.log('trainafter');
   console.log(traindata.length);
    console.log(trainer.train(traindata,trainingopts));

});

 
  //res.send(traindata);
  

  console.log("send");
res.send(['trained']);
    //console.log(data);
    //res.send([data]);
    //var array = JSON.parse(req.body.posarray);
   //traindata = JSON.parse(data);
//})



function pump() {
    var pos;
    //var pumpdata = [];
    while ((pos = buf.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer
        if (pos == 0) { // if there's more than one newline in a row, the buffer will now start with a newline
            buf = buf.slice(1); // discard it
            continue; // so that the next iteration will start with data
        }
        processLine(buf.slice(0,pos)); // hand off the line
        buf = buf.slice(pos+1); // and slice the processed data off the buffer
    }
    //console.log(pumpdata);
    //return pumpdata;
}

function processLine(line) { // here's where we do something with a line
    if (line[line.length-1] == '\r') line=line.substr(0,line.length-1); // discard CR (0x0D)
    var data = [];
    if (line.length > 0) { // ignore empty lines
        var obj = JSON.parse(line); // parse the JSON
        //console.log(obj); // do something with the data here!
        data.push(obj);

    }
    traindata.push(data);
    //console.log(data);
    //return data;
}

});

function makeinput(emotion,array){
  var arrpack = [];
  array.forEach(function(currentValue,index){
    arrpack.push(currentValue[0]/divby);
    arrpack.push(currentValue[1]/divby);
  });
  emopack = [0,0,0,0,0,0,0];
  //emopack = [emotion];
  emopack[emotion] = 1;
  pack = {};
  pack.input = arrpack;
  pack.output = emopack;
  return pack;
  //trainingSet = [{input: [0,0],output: [0]}]
}


module.exports = router;
