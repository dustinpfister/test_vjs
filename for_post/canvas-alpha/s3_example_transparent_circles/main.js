
var state = circles.create({
        canvas: document.getElementById('the-canvas')
    });
draw.setGradient(state);
var loop = function () {
    requestAnimationFrame(loop);
    draw.back(state);
    draw.circles(state);
    circles.update(state);
};
loop();
