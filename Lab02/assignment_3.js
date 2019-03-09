
const GRAPH_TOP_PADDING = 100.0;
const GRAPH_SIDE_PADDING = 50.0;
const GRAPH_WIDTH = 800.0;
const GRAPH_HEIGHT = 388.0; // Max height = 2052px
const GRAPH_VERT_SUBSECTION_HEIGHT = 97.0;
const GRAPH_BAR_WIDTH = 90.0;

var ampGlobal;

function drawGridAndCompanyName(ctx, x, y, name) {
	ctx.beginPath();

	ctx.moveTo(x, y);	
	ctx.lineTo(x, y + GRAPH_HEIGHT); // Y axis
	ctx.lineTo(x + GRAPH_WIDTH, y + GRAPH_HEIGHT); // X axis
	ctx.strokeStyle = "#222f3e";
	ctx.lineWidth = 3;
	ctx.stroke();

	for (var i = 1; i < 4; i++) {
		ctx.moveTo(x, y + GRAPH_VERT_SUBSECTION_HEIGHT * i);
		ctx.lineTo(x + GRAPH_WIDTH, y + GRAPH_VERT_SUBSECTION_HEIGHT * i);
		ctx.strokeStyle = '#c8d6e5';
		ctx.lineWidth = 1;
		ctx.stroke();
	}

	ctx.fillStyle = '#222f3e';
	ctx.font = "15px Lato";

	ctx.fillText((ampGlobal * 0.75) + ' mln. $', x + GRAPH_WIDTH - 60.0, y + GRAPH_VERT_SUBSECTION_HEIGHT - 10.0);
	ctx.fillText(name, x + 15.0, y + 10.0);
}

function getBarHeightsAmp(incomeData, profitData) {
	var amplitude = 0;
	for (var i = 0; i < incomeData.length; i++) {
		if (incomeData[i] > amplitude)
			amplitude = incomeData[i];
		if (profitData[i] > amplitude)
			amplitude = profitData[i];
	}

	return amplitude;
}

function getBarHeights(incomeData, profitData) {
	var amplitude = getBarHeightsAmp(incomeData, profitData);
	var barHeightsList = [];
	// amplitude - GRAPH_HEIGHT
	// arrayElement[i] - x
	for (var i = 0; i < incomeData.length; i++) {
		barHeightsList.push(incomeData[i] * GRAPH_HEIGHT / amplitude);
		barHeightsList.push(profitData[i] * GRAPH_HEIGHT / amplitude);
	}

	return barHeightsList;
}

function drawBars(ctx, x, y, incomeData, profitData) {
	ctx.beginPath();
	var barHeights = getBarHeights(incomeData, profitData);


	for (var i = 0, j = 1; i < barHeights.length; i += 2) {
		// Example of a barHeights array: [height_of_income_no_1, height_of_profit_no_1, ..]

		// Income		
		ctx.fillStyle = '#ee5253';
		ctx.fillRect(x + (100.0 * i + 10.0), y + (GRAPH_HEIGHT - barHeights[i]), GRAPH_BAR_WIDTH, barHeights[i]);

		// Profit
		ctx.fillStyle = '#2e86de';
		ctx.fillRect(x + (100.0 * i + 100.0), y + (GRAPH_HEIGHT - barHeights[i + 1]), GRAPH_BAR_WIDTH, barHeights[i + 1]);

		// Income
		ctx.fillStyle = '#222f3e';
		ctx.font = "15px Lato";
		ctx.fillText('Q' + j, x + (100.0 * i + 10.0) + 77.5, y + GRAPH_HEIGHT + 20.0);
		j++;
	}
}

function drawBarGraphs(canvasManager, companyDataArray) {
	// Init the grids
	for (var i = 0; i < 4; i++) {
		drawGridAndCompanyName(canvasManager.context, GRAPH_SIDE_PADDING, 
						GRAPH_TOP_PADDING * (i+1) + GRAPH_HEIGHT * i, companyDataArray[i].companyName);
		drawBars(canvasManager.context, GRAPH_SIDE_PADDING, 
						GRAPH_TOP_PADDING * (i+1) + GRAPH_HEIGHT * i, companyDataArray[i].income, companyDataArray[i].profit);
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

function graphInit(companyDataArray) {
	let canvasManager = {
		canvas : document.getElementById('myCanvas'),
		context : document.getElementById('myCanvas').getContext('2d')
	};


	canvasFix(canvasManager.canvas);
	drawBarGraphs(canvasManager, companyDataArray);
}

function graphInitWrapper() {
	var companies = [];

	for (var i = 1; i < 5; i++) {
		var companyData = {
			income : [document.getElementById('c' + i + '-input-1').value,
					  document.getElementById('c' + i + '-input-2').value,
					  document.getElementById('c' + i + '-input-3').value,
					  document.getElementById('c' + i + '-input-4').value],
			profit : [document.getElementById('c' + i + '-input-1-profit').value,
					  document.getElementById('c' + i + '-input-2-profit').value,
					  document.getElementById('c' + i + '-input-3-profit').value,
					  document.getElementById('c' + i + '-input-4-profit').value],
			companyName : document.getElementById('chart-name-' + i).value
		};
		companies.push(companyData);
	}

	ampGlobal = getBarHeightsAmp(companyData.income, companyData.profit);
	graphInit(companies);
}





