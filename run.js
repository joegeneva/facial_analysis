var synaptic = require('synaptic');
var fs = require('fs');
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

var trainingopts = {
        rate: .01,
        iterations: 100,
        error: .005,
        shuffle: true,
        log: 10,
        cost: Trainer.cost.MSE
    }
    var array= {};
function readData(filename){
    var data;
fs.readFile(filename,'utf8', function(err,data) 
    {
        if(err) {
            console.log(err);
        }
        data = data;
    })
    array = JSON.parse(data);
}

var myNetwork = new Architect.Perceptron(112, 80,7);
//trainer does propagate much better then you.
var trainer = new Trainer(myNetwork);
var trainfile = "/home/joe/test.json";
var practice = "/home/joe/train.json";

readData(trainfile);
trainer.train(array.data,trainingopts);
