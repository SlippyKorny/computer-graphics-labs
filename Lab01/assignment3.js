function draw()
{
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	
	// X / Y axis
	context.beginPath();
	context.moveTo(300, 500);
	context.lineTo(1000, 500);
	context.moveTo(300, 500);
	context.lineTo(300, 150);
	context.closePath();
	context.lineWidth = 5;
	context.strokeStyle = "black";
	context.stroke();
	
	// 
	context.beginPath();
	context.moveTo(300, 450);
	context.lineTo(1000, 450);
	context.moveTo(300, 400);
	context.lineTo(1000, 400);
	context.moveTo(300, 350);
	context.lineTo(1000, 350);
	context.moveTo(300, 300);
	context.lineTo(1000, 300);
	context.moveTo(300, 250);
	context.lineTo(1000, 250);
	context.moveTo(300, 200);
	context.lineTo(1000, 200);
	context.closePath();
	context.lineWidth = 2;
	context.strokeStyle = "gray";
	context.stroke(); 
	
	context.strokeStyle = 'green';
	context.lineWidth = 80;
	context.lineCap = 'butt';
	context.beginPath();
	context.moveTo(400, 500);
	context.lineTo(400, 450);
	context.stroke();

	context.strokeStyle = 'red';
	context.beginPath();
	context.moveTo(550, 500);
	context.lineTo(550, 250);
	context.stroke();

	context.strokeStyle = 'blue';
	context.beginPath();
	context.moveTo(700, 500);
	context.lineTo(700, 300);
	context.stroke();

	context.strokeStyle = 'yellow';
	context.beginPath();
	context.moveTo(850, 500);
	context.lineTo(850, 350);
	context.stroke();
	
	context.font = "30pt Times New Roman";
	context.fillStyle = "black";
	context.fillText("1", 260, 465);
	context.fillText("2", 260, 415);
	context.fillText("3", 260, 365);
	context.fillText("4", 260, 315);
	context.fillText("5", 260, 265);
	context.fillText("6", 260, 215);
}
