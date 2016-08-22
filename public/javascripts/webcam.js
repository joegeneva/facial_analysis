var video = document.querySelector("#videoElement");

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true}, handleVideo, videoError);
}

function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
}

function videoError(e) {
    // do something
}

var ctracker = new clm.tracker();

ctracker.init(pModel);
var videoInput = document.getElementById('videoElement');

ctracker.start(videoInput);

var canvasInput = document.getElementById('drawCanvas');
var cc = canvasInput.getContext('2d');
  function drawLoop() {
    requestAnimationFrame(drawLoop);
    cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
    ctracker.draw(canvasInput);
  }
drawLoop();
var positions;
//there are 71 positions for current model
//x and y go from 0 to 250
positions= [];
for(k=0;k<56;k++){
  positions[k]= [];
}

function positionLoop() {
    requestAnimationFrame(positionLoop);
    
    wpositions = ctracker.getCurrentPosition();
    if(wpositions.length > 15){
    wpositions = wpositions.slice(15,wpositions.length);
    //console.log(wpositions.length)
    for(i=0;i<wpositions.length;i++){
      
      for(j=0;j<2;j++){

        positions[i][j]=Math.round(wpositions[i][j]*100)/100;
      }
    }
    }
    // positions = [[x_0, y_0], [x_1,y_1], ... ] xxx.xxx digits
    // do something with the positions ...
  }
  positionLoop();
  //console.log(positions);
