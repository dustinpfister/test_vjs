
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;

ctx.translate(0.5, 0.5);

var drawBallObject = function (ball, ctx) {

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

};

var ball = b.createBallObject({
        x: canvas.width / 2,
        y: canvas.height / 2
    });

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);


drawBallObject(ball, ctx);