var FIGURE_AMOUNT = 6;

var RECT_AMOUNT = 6, CIRCLE_AMOUNT = 6;

// Rect data
const RECT_FILL_COLORS = ['#f9ca24', '#eb4d4b', '#6ab04c', '#be2edd', '#4834d4', '#130f40'];
const RECT_WIDTH = 100.0;
const RECT_HEIGHT = 100.0;
const RECT_POINT_OF_ORIGIN = 0.0;

// Circle data
const CIRCLE_FILL_COLORS = ['#f9ca24', '#eb4d4b', '#6ab04c', '#be2edd', '#4834d4', '#130f40'];
const CIRCLE_RADIUS = 50.0;
const CIRCLE_POINT_OF_ORIGIN_X = 500.0;
const CIRCLE_POINT_OF_ORIGIN_Y = 40.0;


function drawSingleRect(context, x, y, width, height, fillColor) {
	context.fillStyle = fillColor;
	context.fillRect(x, y, width, height);
}

function degreesToRadians(degrees) {
	return degrees * Math.PI / 180.0;
}

function drawSingleCircle(context, x, y, radius, fillColor) {
	context.fillStyle = fillColor;
	context.beginPath();
	context.moveTo(x, y);
	context.arc(x, y, CIRCLE_RADIUS, 0, degreesToRadians(360));
	context.closePath();
	context.fill();
}

function drawFigures(canvasManager) {
	// Rects
	for (var i = 0; i < RECT_AMOUNT; i++) {
		drawSingleRect(canvasManager.context, RECT_POINT_OF_ORIGIN + (50.0 * (i+1)), 
				RECT_POINT_OF_ORIGIN + (50.0 * (i+1)), RECT_WIDTH, RECT_HEIGHT, RECT_FILL_COLORS[i]);
	} for (var i = 0; i < CIRCLE_AMOUNT; i++) {
		console.log('Color: ' + CIRCLE_FILL_COLORS[i]);
		drawSingleCircle(canvasManager.context, CIRCLE_POINT_OF_ORIGIN_X + (50.0 * (i+1)),
				CIRCLE_POINT_OF_ORIGIN_Y + (50.0 * (i+1)), CIRCLE_RADIUS, CIRCLE_FILL_COLORS[i]);
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

function setUpCanvas() {
	let canvasManager = {
		canvas : document.getElementById('myCanvas'),
		context : document.getElementById('myCanvas').getContext('2d')
	};
	canvasFix(canvasManager.canvas);
	drawFigures(canvasManager);
	// and other stuff
}

function assignment1Wrapper() {
	RECT_AMOUNT = document.getElementById('rectangles').value;
	CIRCLE_AMOUNT = document.getElementById('circles').value;
	setUpCanvas();
}




