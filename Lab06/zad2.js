let canvasFix = function(canvas) {
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return ctx;
}

let drawShape = function() {
	let canvas = document.getElementById('myCanvas');
	let ctx = canvas.getContext('2d');
	let pts = [
		{x: 60.0, y: 10.0},
		{x: 60.0, y: 200.0},
		{x: 130.0, y: 150.0},
		{x: 170.0, y: 200.0},
		{x: 210.0, y: 150.0},
		{x: 250.0, y: 200.0},
		{x: 250.0, y: 10.0},
		{x: 210.0, y: 60.0},
		{x: 170.0, y: 10.0},
		{x: 130.0, y: 60.0},
		{x: 60.0, y: 60.0}
		// Putting the same point at the end to make it ez to draw
	];

	canvasFix(canvas);

	ctx.fillStyle = "white";
	ctx.lineWidth = 1;
	ctx.imageSmoothingEnabled = false;
	ctx.fillRect(0, 0, 402, 402);

	ctx.beginPath();
	ctx.moveTo(pts[0].x, pts[0].x);
	for (var i = 1; i < pts.length; i++) {
		let x = pts[i].x;
		let y = pts[i].y;
		ctx.lineTo(x, y);
	}

	ctx.strokeStyle = "red";
	ctx.stroke();
}

let getHorizontalVertices = function(lineNo) {
	let vertices = [];
	let ctx = document.getElementById('myCanvas').getContext('2d');
	let imgData = ctx.getImageData(1, lineNo, 400, 1).data;
	var index = 0;

	for (var i = 0; i < imgData.length; i += 4) {
		let red = imgData[i];
		let green = imgData[i+1];
		let blue = imgData[i+2];

		if (green < 200 && blue < 200) {
			vertices.push({x: index+1, y: lineNo});
			i += 4 * 4; // To trick anti-aliasing
			index += 4;
		}
		index++;
	}

	return vertices;
}

let getVerticalVertices = function(lineNo) {
	let vertices = []
	let ctx = document.getElementById('myCanvas').getContext('2d');
	let imgData = ctx.getImageData(lineNo, 1, 1, 400).data;
	let index = 0;

	for (var i = 0; i < imgData.length; i += 4) {
		let red = imgData[i];
		let green = imgData[i+1];
		let blue = imgData[i+2];
		
		if (green < 200 && blue < 200) {
			vertices.push({x: lineNo, y: index+1});
			i += 4 * 4; // To trick anti-aliasing
			index += 4;
		}
		index++;
	}
	return vertices;
}


let checkIfInside = function(x, y) {
	let horizontalVertices = getHorizontalVertices(y);
	let verticalVertices = getVerticalVertices(x);
	let isHorizontalTrue = false, isVerticalTrue = false;
	console.log("Vertical vertices: ");
	console.log(verticalVertices);
	console.log("Horizontal vertices: ");
	console.log(horizontalVertices);

	if (verticalVertices == [] || horizontalVertices == [])
		return;

	if (verticalVertices[0].y < y && verticalVertices[1].y > y)
		isVerticalTrue = true;
	else {
		for (var i = 1; i < verticalVertices.length; i++) {
			if (i % 2 == 0 && verticalVertices[i+1] != 'undefined' && verticalVertices[i].y < y && verticalVertices[i+1].y > y)
				isVerticalTrue = true;
		}
	}

	if (horizontalVertices[0].x < x && horizontalVertices[1].x > x)
		isHorizontalTrue = true;
	else {
		for (var i = 1; i < horizontalVertices.length; i++) {
			if (i % 2 == 0 && horizontalVertices[i+1] != 'undefined' && horizontalVertices[i].x < x && horizontalVertices[i+1].x > x)
				isHorizontalTrue = true;
		}
	}

	return isVerticalTrue && isHorizontalTrue;
}

let checkClickHandler = function(event) {
	let y = event.clientY - 30.0;
	let x = event.clientX;
	console.log("x: " + x + ", y: " + y);
	let result = checkIfInside(x, y);
	console.log(result);
	result ? alert('It is inside!') : alert('It is outside :c');
}







