var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 32, 32);
ctx.strokeStyle = 'rgba(0,0,0,1)';
ctx.globalAlpha =1;
ctx.lineWidth=1;
ctx.strokeRect(1, 1, 3, 3);

console.log(ctx.getImageData(0,0,3,3));


