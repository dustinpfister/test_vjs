var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);
canvas.width = 320;
canvas.height = 240;


//ctx.strokeStyle = 'red';
//ctx.fillStyle = 'white';
draw.points(ctx, [10,10, 100, 10, 100,100], true, 'red', 'black', 3);