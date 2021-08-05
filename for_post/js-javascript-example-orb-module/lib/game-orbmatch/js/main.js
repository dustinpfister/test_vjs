(function () {

    // state object
    var sm = {
        game: gameMod.create(),
        canvasObj: utils.createCanvas({
            width: 640,
            height: 480,
            container: document.getElementById('canvas-app')
        })
    };

    sm.canvasObj.canvas.addEventListener('mousedown', function (e) {
        var pos = utils.getCanvasRelative(e);
        var orbCollection = sm.game.player.orbCollection;
        // loop orbs
        var i = orbCollection.orbs.length;
        while (i--) {
            var orb = orbCollection.orbs[i];
            var d = utils.distance(orb.x, orb.y, pos.x, pos.y);
            if (d <= orb.radius) {
                console.log(orb);
            }
        }
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
