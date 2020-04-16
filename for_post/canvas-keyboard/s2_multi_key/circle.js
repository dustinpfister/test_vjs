// Draw
var draw = {};
draw.back = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
draw.dispObj = function (ctx, dispObj) {
    ctx.fillStyle = 'red';
};

var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var game = {
    keys: [],
    dispObj: {
        x: 0,
        y: 0
    }
};

game.keyHandler = function (e) {
    game.keys[e.keyCode] = e.type === 'keyup' ? true : false
};

var keyDown = function (e) {
    game.keys[e.keyCode] = true;
};
var keyUp = function (e) {
    game.keys[e.keyCode] = true;
};
window.addEventListener('keydown', game.keyHandler);
window.addEventListener('keyup', game.keyHandler);
