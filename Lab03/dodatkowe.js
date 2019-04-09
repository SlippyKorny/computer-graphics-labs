var canvasSize = {
	width: parseFloat(document.getElementById('canvas-width').value),
	height: parseFloat(document.getElementById('canvas-height').value)
};

var quadraticEquationData = {
	x2: 1.0,
	x: 1.0,
	c: 1.0
}

var gridData = {
	xAxisOrigin : {
		xOrigin: 0.0, 
		yOrigin: 0.0
	}, xAxisLen : 0.0,
	xAxisBoldness : 0.0,
	yAxisOrigin : {
		xOrigin: 0.0,
		yOrigin: 0.0
	}, yAxisLen : 0.0,
	yAxisBoldness : 0.0
}

var points = [];

const canvasManager = {
	canvas : document.getElementById('myCanvas'),
	context : document.getElementById('myCanvas').getContext('2d')
}

const xBoundary = 10.0;

const precision = 0.01;

const rectSizes = 2.0;

let drawPoint = function(x, y) {
	canvasManager.context.fillStyle = '#ff9f43';
	canvasManager.context.fillRect(x, y, 1.0, 1.0);
}

let bresenDraw = function(x0, y0, x1, y1) {
	if (x0 == x1 && y0 == y1) {
		drawPoint(x0, y0);
		return;
	}

	let dx = x1 - x0;
	let sx = (dx < 0) ? -1 : 1;
	let dy = y1 - y0;
	let sy = (dy < 0) ? -1 : 1;

	if (Math.abs(dy) < Math.abs(dx)) {
		let m = dy / dx;
		let b = y0 - m * x0;

		while (x0 != x1) {
			drawPoint(x0, parseInt(Math.round(m * x0 + b)));
			x0 += sx;
		}
	} else {
		let m = dx / dy;
		let b = x0 - m * y0;

		while (y0 != y1) {
			drawPoint(parseInt(Math.round(m * y0 + b)), y0);
			y0 += sy;	
		}
	}

	drawPoint(x1, y1);
}

function setWidthAndHeightData() {
	let width = document.getElementById('canvas-width').value;
	let height = document.getElementById('canvas-height').value;
	canvasSize.width = width;
	canvasSize.height = height;
}

function setCanvasWidthAndHeight() {
	setWidthAndHeightData();
	document.getElementById('myCanvas').style.width = canvasSize.width + "px";
	document.getElementById('myCanvas').style.height = canvasSize.height + "px";
}

function setUpGridData() {
	let yAxisOrigin = {
		xOrigin : canvasSize.width / 2.0,
		yOrigin : 0.0
	};
	let xAxisOrigin = {
		xOrigin : 0.0,
		yOrigin : canvasSize.height / 2.0
	};
	let xAxisBoldness = 1.0;
	let yAxisBoldness = xAxisBoldness;

	gridData.xAxisOrigin = xAxisOrigin;
	gridData.yAxisOrigin = yAxisOrigin;

	gridData.xAxisLen = parseFloat(canvasSize.width);
	gridData.yAxisLen = parseFloat(canvasSize.height);

	gridData.xAxisBoldness = 2.0;
	gridData.yAxisBoldness = 2.0;

	console.log("[Printing out grid data]");
	console.log(gridData);
}

function drawGrid() {
	let ctx = canvasManager.context;
	canvasManager.context.fillStyle = '#222f3e';
	canvasManager.context.beginPath();

	// Drawing x axis
	canvasManager.context.fillRect(gridData.xAxisOrigin.xOrigin, gridData.xAxisOrigin.yOrigin - gridData.xAxisBoldness / 2.0, 
																					gridData.xAxisLen, gridData.xAxisBoldness);
	canvasManager.context.fillRect(gridData.yAxisOrigin.xOrigin - gridData.yAxisBoldness / 2.0, gridData.yAxisOrigin.yOrigin,
																					gridData.yAxisBoldness, gridData.yAxisLen);

	canvasManager.context.font = "18px Lato";
	canvasManager.context.fillText('f(x)', gridData.yAxisOrigin.xOrigin + 5.0, 18.0);
	canvasManager.context.fillText('x', gridData.xAxisLen - 18.0, gridData.xAxisOrigin.yOrigin - 5.0);
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

function getLineCoords() {
	var array = [];

	for (var i = 1; i <= 8; i++) {
		let x = parseFloat(document.getElementById('x' + i).value);
		let y = parseFloat(document.getElementById('y' + i).value);
		array.push([x, y]);
	}

	console.log("[Got line coords]");
	return array;
}

function runOnClick(event) {
  points.push(getCoordsForFuncVals([event.clientX, event.clientY]));
  actionWrapper();
}

function getCoordsForFuncVals(x, y) {
	var newY;
	if (y > 0.0) {
		newY = (canvasSize.height * (xBoundary - y)) / (2.0 * xBoundary);
	} else if (y < 0.0) {
		newY = (canvasSize.height * (xBoundary + Math.abs(y))) / (2.0 * xBoundary);
	} else {
		newY = 0.0;
	}
	var newX = ((xBoundary + x) * canvasSize.width) / (2.0 * xBoundary);
	return [newX, newY];
}

function drawLines() {
	for (var i = 0; i < points.length; i++) {
		let xy = points[i];
		let nxy = points[i];
		let x = xy[0];
		let y = xy[1];
		let nx = nxy[0];
		let ny = nxy[1];

		console.log("[Bresendraw(" + x + ", " + y + ", " + nx + ", " + ny + ")");
		bresenDraw(x, y, nx, ny);
	}
}

function actionWrapper() {
	points.push([0.0, 0.0]);
	actionClick();
}

function actionClick() {
	setCanvasWidthAndHeight();
	canvasFix(canvasManager.canvas);
	setUpGridData();
	drawGrid();
	drawLines();
}




