(function () {

    // draw module
    var draw = {};
    // draw background
    draw.background = function (sm, ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // draw info of a single given orb
    draw.orbInfo = function (sm, ctx, canvas, orb) {
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.fillText('level: ' + orb.level, 10, 20);
        ctx.fillText('points: ' + orb.points.join(','), 10, 30);
        ctx.fillText('ratio: ' + orb.ratio.join(','), 10, 40);
    };

    var sm = {};

    // canvas object
    sm.canvasObj = canvasMod.createCanvas({
            width: 640,
            height: 480,
            container: document.getElementById('canvas-app')
        });

    // game object
    var game = sm.game = {};

    // player object
    game.player = {};
    game.player.orbs = [orbMod.createFromLevel([1, 0, 2, 0], 3)];
    game.player.slots = [];

    game.update = function () {};

    draw.background(sm, sm.canvasObj.ctx, sm.canvasObj.canvas);
    draw.orbInfo(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.orbs[0]);
    console.log(sm);
}
    ());
