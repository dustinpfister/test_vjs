var boxMovement = function (frame, maxFrame, canvas) {

    let sx = -32,
    mx = canvas.width + 32;

};

// draw a state
var draw = function (bx, ctx, canvas) {
    canvas = st.canvas;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(bx.x, bx.y, 16, 0, Math.PI * 2);
    ctx.fill();
};

var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
// app loop
var loop = function () {
    requestAnimationFrame(loop);
    draw(state, ctx, canvas);
};
loop();
