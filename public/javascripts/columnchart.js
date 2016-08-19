
//usage chart.options.title eg
var chart;
   function initChart() {
			chart = new CanvasJS.Chart("chartContainer", {
				title: {
					text: "Emotion Chart"
				},
				data: [{
					type: "column",
					dataPoints: [
						{ y: 45, label: "Happy" ,indexLabel: "Lowest"},
						{ y: 31, label: "Sad" ,indexLabel: "Highest" },
						{ y: 52, label: "Angry" },
						{ y: 10, label: "Fear" },
						{ y: 46, label: "Surprise" },
						{ y: 30, label: "Disgust" },
						{ y: 50, label: "Contempt" },
					]
				}]
			});

		}
    window.onload = function () {
      initChart();
      chart.render();
    }
