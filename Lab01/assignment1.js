function draw() {
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d'); 
	context.fillStyle = 'yellow';
	context.fillRect(0,0,100,100);
	
	
	context.beginPath();
	context.moveTo(1100, 120);
	context.lineTo(1200, 0);
	context.lineTo(1300, 120);
	context.lineTo(1100, 120);
	
	context.fillStyle = 'red';
	context.fill();
	
	context.beginPath();
	context.arc(70, 550, 60, 0, 2 * Math.PI);
	context.closePath();
	context.lineWidth = 5;
	context.strokeStyle = "yellow";
	context.stroke();
	
	context.beginPath();
	context.moveTo(1100, 520);
	context.lineTo(1200, 450);
	context.lineTo(1300, 520);
	context.lineTo(1250, 600);
	context.lineTo(1150, 600);
	context.lineTo(1100, 520);
	
	context.fillStyle = 'blue';
	context.fill();
	
	context.font = "30pt Times New Roman";
	context.fillStyle = "green";
	context.fillText("Witaj grafiko komputerowa", 400, 300);
}
