var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

// sets the actual native size of the canvas
canvas.width = 40;
canvas.height = 40;

// Scales the canvas via in-line css
canvas.style.width = '100px';
canvas.style.height = '100px';

ctx.fillStyle='grey';
ctx.fillRect(0,0,canvas.width,canvas.height)

// red rect is 1/4 the size of the canvas
ctx.strokeStyle = 'red';
ctx.strokeRect(0, 0, 20, 20);

// adds a scaling transformation
ctx.save();
ctx.scale(.5,.5);
ctx.fillStyle = 'black';
// black rect is 1/16 the size of the canvas
ctx.fillRect(0, 0, 20, 20);
console.log(canvas)
ctx.restore();

