var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 320;

var w = 4, h = 4,
colorDepth = 2,
str = IMG.stringFromIndex(38505, colorDepth, w * h),
matrix = IMG.stringToChunk(str, w);

IMG.draw(canvas, matrix, w);

canvas.addEventListener('click', function (e) {
    var bx = e.target.getBoundingClientRect(),
    size = canvas.width / w,
    x = Math.floor((e.clientX - bx.left) / size),
    y = Math.floor((e.clientY - bx.top) / size),
    px = matrix[y][x];
    px += 1;
    if (px >= colorDepth) {
        px = 0;
    }
    matrix[y][x] = px;
    str = IMG.chunkToString(matrix, colorDepth);
	console.log(str)
    IMG.draw(canvas, matrix, w);
    ctx.fillStyle = 'yellow';
	ctx.fillText(str, 10,10)
});
