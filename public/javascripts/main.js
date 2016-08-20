var chartdata;
var positionloop;
$( "#start" ).click(function() {
  //data is gotten back from server
  positionloop = window.setInterval(function(){
    chartdata = {emotion:selectedVal,posarray: JSON.stringify(positions)};
    $.post("/",chartdata,function( data ) {
    console.log( data);
    console.log("success!")
    }, "json")
    .fail(function(a,b,c) {
      console.log(b);
      console.log(c);
    })
  },1000);
});

$( "#stop" ).click(function() {
    window.clearInterval(positionloop);
});

//get value for chart
var selectedVal = "Happy";

$( "input[name=emotion]" ).change(function() {
  var selected = $("input[type='radio'][name='emotion']:checked");
  //console.log(positions);
  if (selected.length > 0) {
      selectedVal = selected.val();
      console.log(selectedVal);
  }
});


$( "#try" ).click(function() {
  //data is gotten back from server
  //positionloop = window.setInterval(function(){
    chartdata = {emotion:selectedVal,posarray: JSON.stringify(positions)};
    $.post("/activate",chartdata,function( data ) {
    console.log( data);
    data.forEach(function(currentValue,index){
      chart.options.data[0].dataPoints[index].y = currentValue;
    });
    chart.render();
    }, "json")
    .fail(function(a,b,c) {
      console.log(b);
      console.log(c);
    })
  //},1000);
});
