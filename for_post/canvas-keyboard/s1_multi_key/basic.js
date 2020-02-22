// Draw
var draw = function (ctx, canvas, state) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
};

var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var state = {
    keys: {}
};

var keyHandler = function (e) {
    state.keys[e.key] = e.type === 'keyup' ? false : true;
	console.log(state.keys);
    draw(ctx, canvas, state);
};

window.addEventListener('keydown', keyHandler);
window.addEventListener('keyup', keyHandler);
