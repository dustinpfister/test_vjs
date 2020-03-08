
// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var makeGradiantData = function (w, h) {
    var data = [],
    y = 0,
    x,
    i = 0;
    w = w || 128;
    h = h || 64;
    while (y < w) {
        x = 0;
        while (x < h) {
            // expressions for r,g,b, and alpha
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 255;
            i += 4;
            x += 1;
        }
        y += 1;
    }
    console.log(data);
    console.log(data.length / (4 * w));
    return new ImageData(new Uint8ClampedArray(data), w, h)
};

console.log(makeGradiantData(3, 2));

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
