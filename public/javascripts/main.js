var controlLoop = new function(){
  var that = this;
   this.check = false;

   this.run = function(process){
     if( !this.check ) {
       process();
       window.setInterval(function(){
        that.run(process);
       },
        5000);
     }
  }
};



function chartBundle(){return {emotion:selectedVal,posarray: JSON.stringify(positions)}}
var chartDataArray = [];
function chartData(){return {data:chartDataArray}}

var collectdata = function(){
  chartDataArray.push(chartBundle());
}

$("#start").click(function(){ controlLoop.run(collectdata); });

$("#stop").click(function(){ controlLoop.check = true; });

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


$( "#activate" ).click(function() {
  //data is gotten back from server
  $.post("/activate",chartdata(),function( data ) {
    console.log( data);
    data.forEach(function(currentValue,index){
      chart.options.data[0].dataPoints[index].y = currentValue;
      //chart.options.data[0].dataPoints[Math.round(data[0])].y = 1;
    });
    chart.render();
    }, "json")
});

$( "#save" ).click(function() {
  //data is gotten back from server
    $.post("/save",chartdata(),function(data) {
      //console.log(data);
    }, "json")
});

$( "#load" ).click(function() {
  //data is gotten back from server
    $.post("/load",function( data ) {
      console.log(data);
    }, "json")
});

$( "#delete" ).click(function() {
    $.post("/delete",function( data ) {
      console.log(data);
    }, "json")
});


$( "#test" ).click(function() {
    $.post("/test",chartdata(),function( data ) {
    console.log( data);
  })
});

$( "#newnn" ).click(function() {
    $.post("/newnn",chartdata(),function( data ) {
    console.log( data);
  })
});

$( "#filetrain" ).click(function() {
    $.post("/filetrain",function( data ) {
    console.log( data);
  })
});