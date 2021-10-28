var draw = function (state, ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, state.canvas.width, state.canvas.height);
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ff0000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(state.x, state.y, state.r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
};
