
// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

var makeGradiantData = function (w, h, fx, fy, maxDist) {
    var data = [],
    y = 0,
    x,
    i = 0;
    w = w || 128;
    h = h || 64;
    fx = fx || 0;
    fy = fy || 0;
    maxDist = maxDist || 200;
    while (y < w) {
        x = 0;
        while (x < h) {
            // expressions for r,g,b, and alpha
            var d = distance(x, y, fx, fy);
            var dPer = d / maxDist >= 1 ? 1 : d / maxDist;
            var c = 255-Math.floor(dPer * 200 + 55);
            data[i] = c;
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 255;
            i += 4;
            x += 1;
        }
        y += 1;
    }
    return new ImageData(new Uint8ClampedArray(data), w, h)
};

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

var imgData = makeGradiantData(250, 250, 0,0, 200);
ctx.putImageData(imgData, 0, 0);
