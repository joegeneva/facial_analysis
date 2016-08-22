var express = require('express');
var app = require('express')();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;
    var fs = require('fs');

trainingopts = {
        rate: .01,
        iterations: 100,
        error: .005,
        shuffle: true,
        log: 10,
        cost: Trainer.cost.MSE
    }



function mystream(filePath){
	this.stream = fs.createReadStream(filePath, {flags: 'r', encoding: 'utf-8'});
	this.buf = '';
}
//i have no idea hwere undefined error is comming from.
mystream.prototype ={
	on :function(){
	this.stream.on('data', function(d) {
		//console.log('heyyyyyyyyyyyyyyyyyyyyyyyyyy');
		//console.log(d);
		//d=d.slice(8);
	var check = d.toString();
	if(check != "undefined"){
		this.buf += check;
	}
    //this.buf += d.toString(); // when data is read, stash it in a string buffer
    //console.log(this.buf);
    //this.buf.splice(0,8);
    pump(this.buf); // then process the buffer
	
	})
	}
	,
	end: function(){
		console.log(getdata);
		var traindata = [].concat.apply([], this.getdata);
		this.stream.on('end', function() {
    	//console.log('trainafter');
    	//console.log(traindata);
    	//console.log(traindata.length);
    	console.log(trainer.train(traindata,trainingopts));
		})
	}
}








function pump(buf) {
    var pos;
    //var pumpdata = [];
    while ((pos = buf.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer
        //console.log(buf);
        if (pos == 0) { // if there's more than one newline in a row, the buffer will now start with a newline
            buf = buf.slice(1); // discard it
            continue; // so that the next iteration will start with data
        }
        
        getdata.push(processLine(buf.slice(0,pos))); // hand off the line
        buf = buf.slice(pos+1); // and slice the processed data off the buffer
    }
    //console.log(pumpdata);
    //return pumpdata;
}

function processLine(line) { // here's where we do something with a line
    //console.log(line);
    //if (line[line.length-1] == '\r') line=line.substr(0,line.length-1); // discard CR (0x0D)
    var data = [];
    if (line.length > 0) { // ignore empty lines
    	try{
        var obj = JSON.parse(line); // parse the JSON
        data.push(obj);
    }
    catch(er){
    	console.log(er);
    }
        //console.log(obj); // do something with the data here!
        

    }
    return data;
    //console.log(data);
    //return data;
}


var myNetwork = new Architect.Perceptron(112, 80,7);



//trainer does propagate much better then you.

var trainer = new Trainer(myNetwork);
var fs = require('fs');
var getdata = [];
var trainfile = "/home/joe/test.json";
var practice = "/home/joe/train.json";
var load = new mystream(trainfile);
load.on();
load.end();