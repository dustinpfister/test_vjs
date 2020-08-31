var container = document.getElementById('canvas-app'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
container.appendChild(canvas);

var planets = planetMod.createPlanets({
        canvas: canvas
    });

var update = function (planets, x, y) {
    var targets = planetMod.getTargets(planets, x, y);
    draw.back(ctx, canvas);
    draw.targets(ctx, targets);
};

var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};

canvas.addEventListener('click', function (e) {
    var pos = getCanvasRelative(e);
    update(planets, pos.x, pos.y);
});

update(planets, canvas.width / 2, canvas.height / 2);
