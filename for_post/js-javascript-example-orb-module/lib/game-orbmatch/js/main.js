(function () {

    // state object
    var sm = {
        game: gameMod.create(),
        selectedOrb: null,
        canvasObj: utils.createCanvas({
            width: 640,
            height: 480,
            container: document.getElementById('canvas-app')
        })
    };

    var canvas = sm.canvasObj.canvas;

    canvas.addEventListener('mousedown', function (e) {
        var pos = utils.getCanvasRelative(e);
        sm.selectedOrb = OrbCollection.getOrbAtPos(sm.game.player.orbCollection, pos.x, pos.y);
    });
    canvas.addEventListener('mousemove', function (e) {
        var pos = utils.getCanvasRelative(e);
        if (sm.selectedOrb) {
            var orb = sm.selectedOrb;
            orb.x = pos.x;
            orb.y = pos.y;
        }
    });
    canvas.addEventListener('mouseup', function (e) {
        sm.selectedOrb = null;
    });

    var loop = function () {
        requestAnimationFrame(loop);
        // draw
        draw.background(sm, sm.canvasObj.ctx, sm.canvasObj.canvas);
        draw.orb(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.orbCollection.orbs[0]);
        draw.orbInfo(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.orbCollection.orbs[0]);
    };
    loop();
}
    ());
