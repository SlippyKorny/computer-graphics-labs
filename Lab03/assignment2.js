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

function setQuadraticEquationData() {
	let x2 = parseFloat(document.getElementById('a-val').value);
	let x = 0.0;
	let c = 0.0;
	quadraticEquationData.x2 = x2;
	quadraticEquationData.x = x;
	quadraticEquationData.c = c;
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

function drawParabola() {
	let p = parseFloat(document.getElementById('p').value);
	let q = parseFloat(document.getElementById('q').value);
	draw(p, q, canvasManager.context, canvasManager.canvas);
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

function setCanvas()
{
	var canvas = document.getElementById('image');
	canvas.width = 400;
	canvas.height = 400;
}

function draw(p, q, context, canvas) {
	var a = p/q;
	
	var OX = canvas.width / 2;
	var OY = canvas.height / 2;
	
	var xp = 10;
	var xk = canvas.width - 10;
	
	var x = 0 - OX;
	var y = -(a * Math.pow(x, 2)) + OY;

	context.beginPath();
	context.moveTo(0, y);
	for(var i = xp; i < xk; i++)
	{
		x = i - OX;
		y = -(a * Math.pow(x, 2)) + OY;
		
		context.lineTo(i - canvas.width / 4.0, y / 2.0);
	}
	context.strokeStyle = 'red';
	context.stroke();
}

function actionWrapper() {
	setCanvasWidthAndHeight();
	canvasFix(canvasManager.canvas);
	setUpGridData();
	drawGrid();
	setQuadraticEquationData();
	drawParabola();
}




