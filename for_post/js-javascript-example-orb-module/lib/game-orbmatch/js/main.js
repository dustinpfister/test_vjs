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

    var loop = function(){
        requestAnimationFrame(loop);
        // draw
        draw.background(sm, sm.canvasObj.ctx, sm.canvasObj.canvas);
        draw.orb(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.orbCollection.orbs[0]);        
        draw.orbInfo(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.orbCollection.orbs[0]);
    };
    loop();
}
    ());
