

var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.blocks = function (ctx, state) {

    ctx.fillStyle = 'rgba(0,255,0,0.5)';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    state.blocks.forEach(function (block) {
        ctx.beginPath();
        ctx.rect(block.x, block.y, block.w, block.h);
        ctx.fill();
        ctx.stroke();
    });

};
