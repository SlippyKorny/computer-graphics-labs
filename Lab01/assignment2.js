

function draw() {
	let canvas = document.getElementById('myCanvas');
	let context=canvas.getContext('2d');
	let xCoord = 650;
	let yCoord = 300;

	context.beginPath();
	context.arc(xCoord, yCoord, 200, 2 * Math.PI, 0, false);
	context.closePath();
	context.lineWidth = 3;
	context.strokeStyle = "black";
	context.stroke();
	
	let radians = Math.PI / 180;
	context.beginPath();
	context.moveTo(xCoord, yCoord);
	context.arc(xCoord, yCoord, 200, 270 * radians, ((1 / 13) * 360 + 270) * radians, false);
	context.closePath();
	context.fillStyle = 'green';
	context.fill();
	
	
	context.beginPath();
	context.moveTo(xCoord, yCoord);
	context.arc(xCoord, yCoord, 200,((1 / 13) * 360 + 270) * radians, ((6 / 13) * 360 + 270) * radians,false);
	context.closePath();
	context.fillStyle = 'red';
	context.fill();
	
	context.beginPath();
	context.moveTo(650,300);
	context.arc(xCoord, yCoord, 200,((6 / 13) * 360 + 270) * radians, ((10 / 13) * 360 + 270) * radians, false);
	context.closePath();
	context.fillStyle = 'blue';
	context.fill();
	
	context.beginPath();
	context.moveTo(xCoord, yCoord);
	context.arc(xCoord, yCoord, 200, ((10 / 13) * 360 + 270) * radians, (360+270) * radians, false);
	context.closePath();
	context.fillStyle = 'yellow';
	context.fill();

	context.fillStyle = 'black';
	context.fillRect(0, 0, 300, 150);

	context.font = "20px Georgia";
	context.fillStyle = "white";
	context.fillText("Legenda: ", 10, 20);

	let one = (1/13)*100;
	context.fillStyle = "green";
	context.fillText("1. '1': " + one + '%', 10, 45);

	let two = (5/13)*100;
	context.fillStyle = "red";
	context.fillText("2. '5': " + two + '%', 10, 70);

	let three = (4/13)*100;
	context.fillStyle = "blue";
	context.fillText("3. '4': " + three + '%', 10, 95);

	let four = (3/13)*100;
	context.fillStyle = "yellow";
	context.fillText("4. '3': " + four + '%', 10, 120);
}
