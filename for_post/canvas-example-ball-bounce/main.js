
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
    var x,
    y;
    // draw ball
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // draw heading line
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);
    x = Math.cos(ball.h) * ball.r * 2 + ball.x;
    y = Math.sin(ball.h) * ball.r * 2 + ball.y;
    ctx.lineTo(x, y);
    ctx.stroke();
};

// draw ball collection
var drawBallCollection = function (balls, ctx) {
    balls.forEach(function (ball) {
        drawBallObject(ball, ctx);
    });
};

// create ball collection
var balls = b.createBallCollection({
        count: 2,
        r: 20,
        d: 1,
        h: Math.PI / 2,
        forBall: function (ball, i, opt) {
            var space = 3.5;
            ball.x = canvas.width / 2 - ball.r * space * opt.count / 2 + ball.r * (space / 2) + ball.r * i * space;
            ball.y = canvas.height / 2;
        }
    });

var lt = new Date();

var loop = function () {

    var i,
    now = new Date(),
    t = now - lt,
    ball;

    requestAnimationFrame(loop);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBallCollection(balls, ctx);

    i = 0;
    while (i < balls.length) {

        ball = balls[i];

        // move
        ball.x += Math.cos(ball.h) * ball.d;
        ball.y += Math.sin(ball.h) * ball.d;

        // boundaries
        if (ball.y >= canvas.height - ball.r) {
            ball.y = canvas.height - ball.r;
            ball.h += Math.PI;
        }

        if (ball.y <= ball.r) {
            ball.y = ball.r;
            ball.h += Math.PI;
        }

        i += 1;
    }
};

loop();
