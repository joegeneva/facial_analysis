var synaptic = require('synaptic');
var fs = require('fs');
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

var trainingopts = {
        rate: .01,
        iterations: 5,
        error: .005,
        shuffle: true,
        log: 1,
        cost: Trainer.cost.MSE
    }

function log(foo){
    console.log(foo);
}

var myNetwork = new Architect.Perceptron(112, 80,7);
//trainer does propagate much better then you.
var trainer = new Trainer(myNetwork);
var trainfile = "/home/joe/test.json";
var practice = "/home/joe/train.json";

var trainData = fs.readFileSync(trainfile,'utf8');
var testData = fs.readFileSync(practice,'utf8');
trainData = JSON.parse(trainData);
testData = JSON.parse(testData);
trainer.train(trainData.data,trainingopts);
log(trainer.train(testData.data));


