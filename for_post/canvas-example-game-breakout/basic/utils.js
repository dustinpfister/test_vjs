var util = {};

util.boundingBox = function (a, b) {
    return !(
        (a.y + a.h) < (b.y) ||
        a.y > (b.y + b.h) ||
        (a.x + a.w) < b.x ||
        a.x > (b.x + b.w));
};

util.ballBounds = function (ball, canvas) {
    // boundaries
    //if (ball.y >= canvas.height - ball.radius) {
    //    ball.y = canvas.height - ball.radius;
    //    ball.heading = ball.heading * -1;
    //}
    if (ball.y <= ball.radius) {
        ball.y = ball.radius;
        ball.heading = ball.heading * -1;
    }
    if (ball.x >= canvas.width - ball.radius) {
        ball.x = canvas.width - ball.radius;
        ball.heading = (ball.heading + Math.PI) * -1
    }
    if (ball.x <= ball.radius) {
        ball.x = ball.radius;
        ball.heading = (ball.heading + Math.PI) * -1;
    }
};
