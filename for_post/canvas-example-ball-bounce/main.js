
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;

ctx.translate(0.5, 0.5);

// draw a ball object
var drawBallObject = function (ball, ctx) {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
};

var drawBallCollection = function (balls, ctx) {
    balls.forEach(function (ball) {
        drawBallObject(ball, ctx);
    });
};

var balls = b.createBallCollection();

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

drawBallCollection(balls, ctx);
