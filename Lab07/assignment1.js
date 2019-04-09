// TODO: Fix the grid - it's not even
var scale = 30.0;

const GRAPH_HEIGHT = 400.0;
const GRAPH_WIDTH = 400.0;
const GRID_THICKNESS = 1.5;

let cartesianPointToRealPoint = function(x, y, scale) {
	var realX;
	var realY;
	realX = (GRAPH_WIDTH / 2.0) + x * scale;
	if ((x > 0 && y > 0) || (x < 0 && y > 0)) {
		realY = (GRAPH_HEIGHT / 2.0) - y * scale;
	} else if (x < 0 && y < 0) {
		realY = (GRAPH_HEIGHT / 2.0) + Math.abs(y * scale);
	} else if (x == 0 && y > 0) {
		realY = (GRAPH_HEIGHT / 2.0) - y * scale;
	} else {
		realY = (GRAPH_HEIGHT / 2.0) + Math.abs(y * scale);
	}
	return {x: realX, y: realY};
}

let translatePoint = function(x, y, transX, transY, color) {
	let ctx = document.getElementById('myCanvas').getContext('2d');
	let realCoords = cartesianPointToRealPoint(x + transX, y + transY, scale);
	console.log(realCoords);
	ctx.fillStyle = color;
	ctx.fillRect(realCoords.x, realCoords.y, GRID_THICKNESS, GRID_THICKNESS);
}

let drawGrid = function() {
	let canvas = document.getElementById('myCanvas');
	let ctx = canvas.getContext('2d');
	canvasFix(canvas);
	ctx.beginPath();
	ctx.lineWidth = GRID_THICKNESS;
	ctx.strokeStyle = "black";
	ctx.moveTo(0, (GRAPH_HEIGHT/2.0));
	ctx.lineTo(GRAPH_WIDTH + 2.0, (GRAPH_HEIGHT/2.0));
	ctx.stroke();

	ctx.moveTo((GRAPH_WIDTH/2.0), 0);
	ctx.lineTo((GRAPH_WIDTH/2.0), GRAPH_HEIGHT + 2.0);
	ctx.stroke();
}

let drawPoint = function(x, y, color) {
	let ctx = document.getElementById('myCanvas').getContext('2d');
	let realCoords = cartesianPointToRealPoint(x, y, scale);
	console.log(realCoords);
	ctx.fillStyle = color;
	ctx.fillRect(realCoords.x, realCoords.y, GRID_THICKNESS, GRID_THICKNESS);
}

let findTranslationArgs = function(x, y) {
	var transX = 0;
	transX = (x > 0) ? -x : x
	var transY = 0;
	transY = (y > 0) ? -y : y;

	return {x: transX, y: transY};
}

let rotate = function(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

let drawRotatedPoints = function(x, y, x0, y0, angle) {
	drawPoint(x, y, 'red');
	drawPoint(x0, y0, 'green');

	let rotateArr = rotate(x, y, x0, y0, angle);

	drawPoint(rotateArr[0], rotateArr[1], 'blue');
}

let canvasFix = function(canvas) {
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return ctx;
}










