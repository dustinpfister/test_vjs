var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 320;

var w = 4, h = 4,
str = IMG.stringFromIndex(38505, 2, w * h);

IMG.draw(canvas, IMG.stringToChunk(str, w), w);
