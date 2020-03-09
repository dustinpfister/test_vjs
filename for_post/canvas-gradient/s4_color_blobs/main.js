
// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);


ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);


var blobsObj = blobs.create(),
imageData = blobs.toImageData(blobsObj);

ctx.putImageData(imageData, 10, 10);
