
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
            //indexLabel: "Lowest"
            //,indexLabel: "Highest"
						{ y: 0, label: "Happy"},
						{ y: 0, label: "Sad" },
						{ y: 0, label: "Angry" },
						{ y: 0, label: "Fear" },
						{ y: 0, label: "Surprise" },
						{ y: 0, label: "Disgust" },
						{ y: 0, label: "Contempt" },
					]
				}]
			});

		}
    window.onload = function () {
      initChart();
      chart.render();
    }
