const FILL_COLORS = ['#f9ca24', '#eb4d4b', '#6ab04c', '#be2edd', '#4834d4'];

const RADIUS = 200.0;
const CIRCLE_POS_X = 380.0, CIRCLE_POS_Y = 300.0;

const LEGEND_POS_X = 630.0, LEGEND_POS_Y = 550.0;
const LEGEND_WIDTH = 250.0, LEGEND_HEIGHT = 160.0;

function degreesToRadians(degrees) {
	return degrees * Math.PI / 180.0;
}

function drawPartOfCircle(context, x, y, radius, fillColor, degrees, startingPoint) {
	console.log("Execution\r\nx: " + x + "; y: " + y + "; radius: " + radius + "; fillColor: " + fillColor +
	 "; degrees: " + degrees + "; Starting point: " + startingPoint);
	console.log("Degrees to draw as radians: " + degreesToRadians(degrees));
	context.beginPath();
	context.fillStyle = fillColor;
	context.moveTo(x, y);
	context.arc(x, y, radius, degreesToRadians(startingPoint), degreesToRadians(startingPoint) + degreesToRadians(degrees));
	context.closePath();
	context.fill();
	console.log("Should be printed");
}

function percentageToDegrees(percentage) {
	return percentage * 360.0 / 100.0;
}

function drawPieChart(canvasManager, chart) {
	var acc = 0;
	for (var i = 0; i < chart.percentageArray.length; i++) {
		drawPartOfCircle(canvasManager.context, CIRCLE_POS_X, CIRCLE_POS_Y, RADIUS, FILL_COLORS[i],
		 percentageToDegrees(chart.percentageArray[i]), acc);
		acc += percentageToDegrees(chart.percentageArray[i]);
	}
}

function getPercentageArray(array) {
	var accumulatedVal = 0;
	var newList = [];

	for (var i = 0; i < array.length; i++) {
		accumulatedVal += Math.abs(array[i]);
	} for (var i = 0; i < array.length; i++) {
		// 100 - accumulatedVal
		// x - array[i]
		newList.push(array[i] * 100 / accumulatedVal);
	}

	return newList;
}

function canvasFix(canvas) {
  // Get the device pixel ratio, falling back to 1.
  var dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  var rect = canvas.getBoundingClientRect();
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var ctx = canvas.getContext('2d');
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
  return ctx;
}

function drawLegend(canvasMngr, percentageArray, nameArray) {
	canvasMngr.context.fillStyle = '#222f3e';
	canvasMngr.context.fillRect(LEGEND_POS_X, LEGEND_POS_Y, LEGEND_WIDTH, LEGEND_HEIGHT);

	canvasMngr.context.fillStyle = '#c8d6e5';
	canvasMngr.context.font = "15px Lato";
	canvasMngr.context.fillText('"' + document.getElementById('chart-name').value + '"', LEGEND_POS_X + 10.0, LEGEND_POS_Y + 24.0);
	for (var i = 0; i < percentageArray.length; i++) {
		canvasMngr.context.fillStyle = FILL_COLORS[i];
		canvasMngr.context.fillText(nameArray[i] + ': ' + new String(Number.parseFloat(percentageArray[i]).toFixed(2)) + ' %',
		 							LEGEND_POS_X + 10.0, LEGEND_POS_Y + ((i+2) * 24.0));
	}
}

function chartInit(name, dataArray, nameArray) {
	let chart = {
		chartName : name,
		dataArray : dataArray,
		percentageArray : getPercentageArray(dataArray),
		dataNames : nameArray
	};
	let canvasManager = {
		canvas : document.getElementById('myCanvas'),
		context : document.getElementById('myCanvas').getContext('2d')
	};

	canvasFix(canvasManager.canvas);
	drawPieChart(canvasManager, chart);
	drawLegend(canvasManager, chart.percentageArray, nameArray);
}

function chartInitWrapper() {
	let name = document.getElementById("chart-name");
	let dataArray = [document.getElementById('input-1').value, 
					 document.getElementById('input-2').value,
					 document.getElementById('input-3').value,
					 document.getElementById('input-4').value,
					 document.getElementById('input-5').value];
	let nameArray = [document.getElementById('name-1').value,
					 document.getElementById('name-2').value,
					 document.getElementById('name-3').value,
					 document.getElementById('name-4').value,
					 document.getElementById('name-5').value];
	chartInit(name, dataArray, nameArray);
}





