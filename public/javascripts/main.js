//socket code not currently working
var socket = io();
socket.on('error log', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

//used as an easy loop object
var controlLoop = new function(){
   var that = this;
   this.check = false;
   this.stop = false;
   this.loopCount = 0;
   this.dataCount = 0;
   this.run = function(process){
     if( !that.check && (that.loopCount < 50)) {
      console.log('data point');
      that.loopCount +=1;
     
       process();
        that.run(process);
     }
     else{
       that.dataCount+=1;
       commentBox.val('Done collecting data ' + that.dataCount + '\n' + commentBox.val()); 
       this.check = true;
     }
   }
   //depreciated
   this.loop = function(process){
     if( !this.stop) {
       process();
       window.setInterval(function(){
        that.run(process);
       },
        3000);
     }
  }
};

//formatting, wrapping data

function chartBundle(){return {emotion:selectedVal,posarray: JSON.stringify(positions)}}
var chartDataArray = [];
function chartdata(){return {data:JSON.stringify(chartDataArray)}}

var collectdata = function(){
  chartDataArray.push(chartBundle());
}

//commands greatly simplified with above functions

$("#clear").click(function(){ chartDataArray = [] });

$("#start").click(function(){controlLoop.check = false; controlLoop.loopCount = 0; controlLoop.run(collectdata)});

$( "#activate" ).click(function() {controlLoop.stop = false; controlLoop.run(activate) });

$( "#deactivate" ).click(function() {controlLoop.stop = true});
//data is gotten back from server
function activate() {
  $.post("/activate",chartBundle(),function( data ) {
    console.log( data);
    data.forEach(function(currentValue,index){
      chart.options.data[0].dataPoints[index].y = currentValue;
      //chart.options.data[0].dataPoints[Math.round(data[0])].y = 1;
    });
    chart.render();
    }, "json");
} 



//get value for chart
var selectedVal = 0;

$( "input[name=emotion]" ).change(function() {
  var selected = $("input[type='radio'][name='emotion']:checked");
  //console.log(positions);
  if (selected.length > 0) {
      selectedVal = selected.val();
      console.log(selectedVal);
  }
});




$( "#save" ).click(function() {
  //data is gotten back from server
    $.post("/save",chartdata(),function(data) {
      //console.log(data);
      chartDataArray = [];
      commentBox.val('Data sent' + '\n' + commentBox.val()); 
    }, "json")
});


$( "#delete" ).click(function() {
    $.post("/delete",function( data ) {
      console.log(data);
    }, "json")
});

var commentBox = $("#comments");

//sends one data sample to the server to test it
$( "#test" ).click(function() {
    $.post("/test",chartBundle(),function( data ) {
    commentBox.val(JSON.stringify(data) + '\n' + commentBox.val());
    console.log( data);
  })
});

$( "#newnn" ).click(function() {
    $.post("/newnn",chartdata(),function( data ) {
    console.log( data);
  })
});

//trains nn from saved data
$( "#filetrain" ).click(function() {
    $.post("/filetrain",function( data ) {
    console.log( data);
  })
});