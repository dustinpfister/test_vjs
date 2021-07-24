(function () {

    // draw module
    var draw = {};
    // draw background
    draw.background = function (sm, ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
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

    console.log(sm);
}
    ());
