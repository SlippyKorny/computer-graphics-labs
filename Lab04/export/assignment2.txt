var n;
 
function draw(form)
{
	var canvas = document.getElementById('image');
	var context = canvas.getContext('2d');
	var x, y;
	var dx = 280;
	var dy = 280;
	var r = 50;
	
	context.fillStyle = "white";
	context.fillRect(0,0,600,600);
	context.fillStyle = "black";
	
	n = parseInt(form.n.value);     
	
	if(n < 7)
	{
		alert("n musi być większe od 7");
		return;
	}
	
	var cb = [0,0,0,255];
	var cn = [66, 134, 244, 250];
	
	x = (Math.sin(2 * Math.PI )* r) + dx;  
	y = (Math.cos(2 * Math.PI) * r) + dy;   
	var i;
	context.beginPath();
	
	context.moveTo(x,y);
	for(i=1; i<n; i++){
			x = (Math.sin(2 * Math.PI / n * i) * r) + dx;  
			y = (Math.cos(2 * Math.PI / n * i) * r) + dy;           
			context.lineTo(x,y);
	}
	context.closePath();
	context.stroke();
	
	fill4(dx,dy,cb,cn);
	

}
            
function fill4(dx, dy, cb, cn){
	var canvas = document.getElementById('image');
	var context = canvas.getContext('2d');
	
	var createData = context.createImageData(1, 1);
	var px = createData.data;
	var color = context.getImageData(dx, dy, 1, 1).data;
							   						
	px[0] = cn[0];
	px[1] = cn[1];
	px[2] = cn[2];
	px[3] = cn[3];
					
	if(equalColor(color, [255,255,255]))
	{
		context.putImageData(createData, dx, dy);
		setTimeout(function (){
			fill4(dx,dy-1,cb,cn); 
			fill4(dx,dy+1,cb,cn); 
			fill4(dx-1,dy,cb,cn); 
			fill4(dx+1,dy,cb,cn);
		}, 0);
	}
}

function equalColor(c1, c2){
	return c1[0]===c2[0] && c1[1]===c2[1] && c1[2]===c2[2] ;
}