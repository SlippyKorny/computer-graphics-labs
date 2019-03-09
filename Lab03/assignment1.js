var canvasSize = {
	width: parseFloat(document.getElementById('canvas-width').value),
	height: parseFloat(document.getElementById('canvas-height').value)
};

var quadraticEquationData = {
	x2: 1.0,
	x: 1.0,
	c: 1.0,
	amplitude : Number.MIN_VALUE
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

const canvasManager = {
	canvas : document.getElementById('myCanvas'),
	context : document.getElementById('myCanvas').getContext('2d')
}

const xBoundary = 10.0;

const precision = 0.01;

const rectSizes = 2.0;

let quadraticFunction = function(x) {
	// a * x^2 + b * x + c
	// c should be negative
	return (quadraticEquationData.x2 * Math.pow(x, 2)) + (quadraticEquationData.x * x) - quadraticEquationData.c;
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

function setAmplitude() {
	// let quadraticFunction = function(x) {
	// 	return (quadraticEquationData.x2 * Math.pow(x, 2)) + (quadraticEquationData.x * x) - quadraticEquationData.c;
	// }

	for(var i = 0.0; i < xBoundary; i += 0.1) {
		let someVal = quadraticFunction(i);
		if (someVal > quadraticEquationData.amplitude)
			quadraticEquationData.amplitude = someVal;
	}
}

function setQuadraticEquationData() {
	let x2 = parseFloat(document.getElementById('a-val').value);
	let x = parseFloat(document.getElementById('b-val').value);
	let c = parseFloat(document.getElementById('c-val').value);
	quadraticEquationData.x2 = x2;
	quadraticEquationData.x = x;
	quadraticEquationData.c = c;
	setAmplitude();
	console.log("[Printing out quadraticEquationData]");
	console.log(quadraticEquationData);
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

function getCoordsForFuncVals(x, y) {
	// Y THINGS
	// 0.0 - Amplitutde 
	// unkown - y

	// X THINGS
	// 0.0 - (-1.0 * xBoundary)
	// unkown - x

	// console.log("Calculated for f(" + parseFloat(x) + ")");
	// let newY = (y * quadraticEquationData.amplitude * 2.0) / quadraticEquationData.amplitude;
	var newY;
	// if (y > 0.0) {
	// 	newY = (canvasSize.height * (quadraticEquationData.amplitude - y)) / (2.0 * quadraticEquationData.amplitude);
	// } else if (y < 0.0) {
	// 	newY = (canvasSize.height * (quadraticEquationData.amplitude + Math.abs(y))) / (2.0 * quadraticEquationData.amplitude);
	// } else {
	// 	newY = 0.0;
	// }
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

function drawPoint(coordArray) {
	canvasManager.context.beginPath();
	canvasManager.context.fillStyle = '#ff9f43';
	canvasManager.context.fillRect(coordArray[0], coordArray[1], rectSizes, rectSizes);
	// console.log(coordArray);
}

function drawParabola() {
	// let quadraticFunction = function(x) {
	// 	// a * x^2 + b * x + c
	// 	// c should be negative
	// 	return (quadraticEquationData.x2 * Math.pow(x, 2)) + (quadraticEquationData.x * x) - quadraticEquationData.c;
	// }

	console.log("[Drawing the parabola]")
	for(var x = parseFloat(-1.0 * xBoundary), i = 0; parseFloat(x) < parseFloat(xBoundary); x += parseFloat(precision), i++) {
		let y = quadraticFunction(x);
		drawPoint(getCoordsForFuncVals(x, y));
		if (i == 10) {
			console.log("Calculated for f(" + x + ")");
			console.log(getCoordsForFuncVals(x, y));
			i = 0;
		}
	}
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

function actionWrapper() {
	setCanvasWidthAndHeight();
	canvasFix(canvasManager.canvas);
	setUpGridData();
	drawGrid();
	setQuadraticEquationData();
	drawParabola();
}




