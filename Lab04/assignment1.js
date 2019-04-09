let x;
let y;
let bok;

// równoległobok

let draw = function(form) {
  let canvas = document.getElementById('myCanvas');
  let ctx = canvas.getContext('2d');
  // Previously context

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
    
  x = parseInt(form.x.value);
  y = parseInt(form.y.value);
  a = parseInt(form.a.value);

  var seedX = parseInt(form.seedX.value);
  var seedY = parseInt(form.seedY.value);
  
  var cb = [0, 0, 0, 250];
  var cn = [66, 134, 244, 250];
  
  ctx.strokeStyle="Black";
  ctx.strokeRect(x, y, a, a);
  
  if(seedX > x && seedX < x+a && seedY > y && seedY < y+a)
    fill4(seedX,seedY,cb,cn, ctx);                   
}

let fill4 = function(seedX, seedY, cb, cn, ctx) {       
  var createData = ctx.createImageData(1, 1);
  var px = createData.data;
  var color = ctx.getImageData(seedX, seedY, 1, 1).data;

  // odwracamy kolor pikselad
  px[0] = cn[0];
  px[1] = cn[1];
  px[2] = cn[2];
  px[3] = cn[3];
    
  if(seedX > x && seedX < x+a && seedY > y && seedY < y+a)
  {
    if(!equalColor(color, cn))
    {
      ctx.putImageData(createData, seedX, seedY);
      setTimeout(function() {
        fill4(seedX, seedY-1, cb, cn, ctx); 
        fill4(seedX, seedY+1, cb, cn, ctx); 
        fill4(seedX-1, seedY, cb, cn, ctx); 
        fill4(seedX+1, seedY, cb, cn, ctx);
      }, 0);
    }
  }
}

let equalColor = function(c1, c2) {
  return c1[0]==c2[0] && c1[1]==c2[1] && c1[2]==c2[2];
}