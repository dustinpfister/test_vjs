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

    

    // draw
    draw.background(sm, sm.canvasObj.ctx, sm.canvasObj.canvas);
    draw.orbInfo(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.orbCollection.orbs[0]);
}
    ());
