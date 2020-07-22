(function () {

    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    // append to body
    document.body.appendChild(canvas);

    // set actual matrix size of the canvas
    canvas.width = 320;
    canvas.height = 240;

    var state = {
        cx: canvas.width / 2,
        cy: canvas.height / 2,
        x: 0,
        y: 0,
        r1: 100,
        r2: 32,
        frameIndex: 0,
        maxFrames: 50
    };

    var set = function (state) {
        var per = state.frameIndex / state.maxFrames,
        radian = Math.PI * 2 * per;
        state.x = state.cx + Math.cos(radian) * state.r1;
        state.y = state.cy + Math.sin(radian) * state.r1;
    };

    var tick = function (state) {
        state.frameIndex += 1;
        state.frameIndex %= state.maxFrames;
        set(state);
    };

    var draw = function (ctx, canvas, state) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //ctx.fillStyle = 'red';
        //ctx.strokeStyle = 'white';
        //ctx.beginPath();
        //ctx.arc(state.x, state.y, state.r2, 0, Math.PI * 2);
        //ctx.fill();
        //ctx.stroke();
    };

    //set(state)
    draw(ctx, canvas);

}
    ());
