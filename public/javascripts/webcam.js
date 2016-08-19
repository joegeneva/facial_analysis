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
function positionLoop() {
    requestAnimationFrame(positionLoop);
    positions = ctracker.getCurrentPosition();

    // positions = [[x_0, y_0], [x_1,y_1], ... ] xxx.xxx digits
    // do something with the positions ...
  }
  positionLoop();
  //console.log(positions);
