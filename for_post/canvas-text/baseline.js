// get the canvas, context and set size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

var mess = 'Hello',
baseY = 10,
stepX = 30;

// drawing a line across the canvas
// with a y value of baseY
ctx.strokeStyle = 'blue';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(0, baseY);
ctx.lineTo(canvas.width, baseY);
ctx.stroke();

// looping over all values for baseLine to
// compare the differences.
ctx.fillStyle = 'red';
[
    'alphabetic',
    'bottom',
    'hanging',
    'ideographic',
    'middle',
    'top'
].forEach(function (baseLineValue, index) {

    ctx.textBaseline = baseLineValue;
    ctx.fillText(mess, stepX * index, baseY);

});
