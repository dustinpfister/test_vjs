
var getClock = function (now, start) {
    var clock = {};
    clock.now = now || new Date(2000, 3, 6, 10, 5);
    clock.start = start || new Date(1983, 3, 6, 10, 5);
    // get t value of the given dates
    clock.t = clock.now - clock.start;
    
    // percent done is between zero and 2.5 billion seconds
    clock.per = clock.t / 1000 / (2.5 * Math.pow(10, 9));
    clock.per = clock.per > 1 ? 1 : clock.per;
    clock.per = clock.per < 0 ? 0 : clock.per;

    // level

    clock.timeText = clock.per.toFixed(10);
    return clock;
};

var drawClockText = function (clock, canvas, ctx, x, y) {
    ctx.lineWidth = 1;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.font = '70px courier';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(clock.timeText, x + 0.5, y + 0.5);
    ctx.strokeText(clock.timeText, x + 0.5, y + 0.5);
};

// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 640;
canvas.height = 240;

var loop = function () {
    requestAnimationFrame(loop);
    var clock = getClock(new Date());
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClockText(clock, canvas, ctx, canvas.width / 2, canvas.height / 2);
};
loop();
