// const GRAPH_HEIGHT = 400.0;
// const GRAPH_WIDTH = 400.0;
// const GRID_THICKNESS = 1.5;

let outerPointsArray = [
	{x: 2, y: 6},
	{x: 2, y: 7},
	{x: 4, y: 7},
	{x: 4, y: 4},
	{x: 4, y: 0},
	{x: -4, y: 0},
	{x: -4, y: 4},
	{x: 4, y: 4},
	{x: 0, y: 8},
	{x: -4, y: 4},
];

let windowPointsArray = [
	{x: 2, y: 2},
	{x: 3, y: 2},
	{x: 3, y: 3},
	{x: 2, y: 3},
	{x: 2, y: 2}
];

let doorPointsArray = [
	{x: -1, y: 0},
	{x: -1, y: 3},
	{x: 1, y: 3},
	{x: 1, y: 0},
	{x: -1, y: 0}
];

let translateAllPts = function() {
	let translationVect = {
		x: parseFloat(document.getElementById('trans-x').value),
		y: parseFloat(document.getElementById('trans-y').value),
	};
	for (var i = 0; i < outerPointsArray.length; i++) {
		let pt = outerPointsArray[i];
		pt.x += translationVect.x;
		pt.y += translationVect.y;
		outerPointsArray[i] = pt;
	}

	for (var i = 0; i < windowPointsArray.length; i++) {
		let pt = windowPointsArray[i];
		pt.x += translationVect.x;
		pt.y += translationVect.y;
		windowPointsArray[i] = pt;
	}	

	for (var i = 0; i < doorPointsArray.length; i++) {
		let pt = doorPointsArray[i];
		pt.x += translationVect.x;
		pt.y += translationVect.y;
		doorPointsArray[i] = pt;
	}	
}

let rotateAllPts = function(cx, cy, angle) {
	for (var i = 0; i < outerPointsArray.length; i++) {
		let pt = outerPointsArray[i];
		let ptArr = rotate(cx, cy, pt.x, pt.y, angle);
		pt.x = ptArr[0];
		pt.y = ptArr[1];
		outerPointsArray[i] = pt;
	}

	for (var i = 0; i < windowPointsArray.length; i++) {
		let pt = windowPointsArray[i];
		let ptArr = rotate(cx, cy, pt.x, pt.y, angle);
		pt.x = ptArr[0];
		pt.y = ptArr[1];
		windowPointsArray[i] = pt;
	}	

	for (var i = 0; i < doorPointsArray.length; i++) {
		let pt = doorPointsArray[i];
		let ptArr = rotate(cx, cy, pt.x, pt.y, angle);
		pt.x = ptArr[0];
		pt.y = ptArr[1];
		doorPointsArray[i] = pt;
	}	
}

let cartesianPointToRealPointNew = function(x, y, scaleX, scaleY) {
	var realX;
	var realY;
	realX = (GRAPH_WIDTH / 2.0) + x * scaleX;
	if ((x > 0 && y > 0) || (x < 0 && y > 0)) {
		realY = (GRAPH_HEIGHT / 2.0) - y * scaleY;
	} else if (x < 0 && y < 0) {
		realY = (GRAPH_HEIGHT / 2.0) + Math.abs(y * scaleY);
	} else if (x == 0 && y > 0) {
		realY = (GRAPH_HEIGHT / 2.0) - y * scaleY;
	} else {
		realY = (GRAPH_HEIGHT / 2.0) + Math.abs(y * scaleY);
	}
	return {x: realX, y: realY};
}

let drawWithSpecifiedArgs = function() {
	if (document.getElementById('trans-checkbox').checked)
		translateAllPts();
	if (document.getElementById('specified-point-rotation-angle-checkbox').checked) {
		rotateAllPts(
			parseFloat(document.getElementById('specified-point-rotation-angle-x').value),
			parseFloat(document.getElementById('specified-point-rotation-angle-y').value),
			parseFloat(document.getElementById('specified-point-rotation-angle-alpha').value));
	}
	if (document.getElementById('center-rotation-angle-checkbox').checked) {
		rotateAllPts(0, 0, parseFloat(document.getElementById('center-rotation-angle').value));
	}

	drawConnectedPoints();
}

let drawConnectedPoints = function() {
	let ctx = document.getElementById('myCanvas').getContext('2d');
	ctx.moveTo(outerPointsArray[0].x, outerPointsArray[1].y);
	ctx.strokeStyle = "red";
	let scaleX = parseFloat(document.getElementById('scale-x').value);
	let scaleY = parseFloat(document.getElementById('scale-y').value);

	console.log(scaleX + ", " + scaleY);

	for (var i = 1; i < outerPointsArray.length; i++) {
		let pt = cartesianPointToRealPointNew(outerPointsArray[i-1].x, outerPointsArray[i-1].y, scaleX, scaleY);
		let nxtPt = cartesianPointToRealPointNew(outerPointsArray[i].x, outerPointsArray[i].y, scaleX, scaleY);
		ctx.moveTo(pt.x, pt.y);
		ctx.lineTo(nxtPt.x, nxtPt.y);
		ctx.stroke();
	}

	ctx.moveTo(windowPointsArray[0].x, windowPointsArray[0].y);
	for(var i = 1; i < windowPointsArray.length; i++) {
		let pt = cartesianPointToRealPointNew(windowPointsArray[i-1].x, windowPointsArray[i-1].y, scaleX, scaleY);
		let nxtPt = cartesianPointToRealPointNew(windowPointsArray[i].x, windowPointsArray[i].y, scaleX, scaleY);
		ctx.moveTo(pt.x, pt.y);
		ctx.lineTo(nxtPt.x, nxtPt.y);
		ctx.stroke();
	}

	ctx.moveTo(doorPointsArray[0].x, doorPointsArray[0].y);
	for(var i = 1; i < doorPointsArray.length; i++) {
		let pt = cartesianPointToRealPointNew(doorPointsArray[i-1].x, doorPointsArray[i-1].y, scaleX, scaleY);
		let nxtPt = cartesianPointToRealPointNew(doorPointsArray[i].x, doorPointsArray[i].y,  scaleX, scaleY);
		ctx.moveTo(pt.x, pt.y);
		ctx.lineTo(nxtPt.x, nxtPt.y);
		ctx.stroke();
	}	
}







