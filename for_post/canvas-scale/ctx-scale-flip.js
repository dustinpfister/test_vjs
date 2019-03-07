var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

canvas.width = 640;
canvas.height= 480;

ctx.scale(1, -1);
ctx.font = '20px serif';
ctx.textBaseline = 'top';
ctx.fillText('foobar', 0, -20);
