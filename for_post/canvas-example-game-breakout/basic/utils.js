var util = {};

util.bb = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return util.boundingBox({
        x: x1,
        y: y1,
        w: w1,
        h: h1
    }, {
        x: x2,
        y: y2,
        w: w2,
        h: h2
    });
};

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
