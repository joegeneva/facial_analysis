var synaptic = require('synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

var myNetwork = new Architect.Perceptron(4,2, 1)
//myNetwork.reset();
var trainer = new Trainer(myNetwork)
var trainopts =
{
    rate: .01,
    iterations: 100000,
    error: .001,
    //4000, .1,.1 worked
    shuffle: true,
    log: 10000,
    cost: Trainer.cost.CROSS_ENTROPY
}

var trainingSet = [
  {
    input: [0,0,0,0],
    output: [0]
  },
  {
    input: [0,1,0,0],
    output: [1]
  },
  {
    input: [1,0,0,0],
    output: [1]
  },
  {
    input: [0,0,1,0],
    output: [1]
  },
  {
    input: [0,1,1,1],
    output: [1]
  },
  {
    input: [1,0,1,1],
    output: [1]
  },
  {
    input: [1,1,0,0],
    output: [0]
  },
  {
    input: [0,0,1,1],
    output: [0]
  },
  {
    input: [1,1,1,1],
    output: [0]
  },
]

console.log(trainer.train(trainingSet,trainopts));
console.log(
  trainer.test(
    [{
      input: [0,1,1,1],
      output: [1]
    }]
  )
);
console.log(myNetwork.activate([0,0,0,0]));
console.log(myNetwork.activate([1,1,1,1]));
console.log(myNetwork.activate([1,1,0,0]));
console.log(myNetwork.activate([0,1,0,0]));
console.log(myNetwork.activate([0,0,1,0]));
console.log(myNetwork.activate([1,1,1,0]));