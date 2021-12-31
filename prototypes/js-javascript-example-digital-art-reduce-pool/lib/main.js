
var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
};

// state object
var canvasObj = utils.createCanvas({
    width: 640,
    height: 480
});
var sm = {
    lt: new Date(),
    fps: 30,
    ctx: canvasObj.ctx,
    canvas: canvasObj.canvas
};

// basic app loop
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 1 / sm.fps) {
		
		draw.background(sm.ctx, sm.canvas);
		
	}
    sm.lt = now;
};
loop();
