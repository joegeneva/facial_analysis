var chartdata;
var positionloop;
$( "#start" ).click(function() {
  //data is gotten back from server
  var timeup = 0;
  positionloop = window.setInterval(function(){
    timeup+=1;
    if (timeup == 3){
      window.clearInterval(positionloop);
    }
    chartdata = {emotion:selectedVal,posarray: JSON.stringify(positions)};
    $.post("/train",chartdata,function( data ) {
    console.log( data);
    console.log("success!");
    }, "json")
    .fail(function(a,b,c) {
      console.log(b);
      console.log(c);
    })
  },500)
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
    //data.forEach(function(currentValue,index){
      //chart.options.data[0].dataPoints[index].y = currentValue;

      chart.options.data[0].dataPoints[Math.round(data[0])].y = 1;
    //});
    chart.render();
    }, "json")
    .fail(function(a,b,c) {
      console.log(b);
      console.log(c);
    })
  //},1000);
});

$( "#save" ).click(function() {
  //data is gotten back from server
  //positionloop = window.setInterval(function(){
    $.post("/save",function( data) {
      console.log(data);
    }, "json")
    .fail(function(a,b,c) {
      console.log(b);
      console.log(c);
    })
  //},1000);
});


$( "#load" ).click(function() {
  //data is gotten back from server
  //positionloop = window.setInterval(function(){
    $.post("/load",function( data ) {
      console.log(data);
    }, "json")
    .fail(function(a,b,c) {
      console.log(b);
      console.log(c);
    })
  //},1000);
});

$( "#delete" ).click(function() {
  //data is gotten back from server
  //positionloop = window.setInterval(function(){
    $.post("/delete",function( data ) {
      console.log(data);
    }, "json")
    .fail(function(a,b,c) {
      console.log(b);
      console.log(c);
    })
  //},1000);
});


$( "#test" ).click(function() {
    chartdata = {emotion:selectedVal,posarray: JSON.stringify(positions)};
    $.post("/test",chartdata,function( data ) {
    console.log( data);
  })
});

$( "#newnn" ).click(function() {
    chartdata = {emotion:selectedVal,posarray: JSON.stringify(positions)};
    $.post("/newnn",chartdata,function( data ) {
    console.log( data);
  })
});
