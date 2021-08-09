(function () {

    var orb = orbMod.createFromLevel([1, 1, 1, 1], 7);
    console.log(orb.type); // 'quad'

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

    var events = {
        pointerStart: function (e, pos, sm) {
            sm.selectedOrb = OrbCollection.getOrbAtPos(sm.game.player.orbCollection, pos.x, pos.y);
        },
        pointerMove: function (e, pos, sm) {
            if (sm.selectedOrb) {
                var orb = sm.selectedOrb;
                orb.x = pos.x;
                orb.y = pos.y;
            }
        },
        pointerEnd: function (e, pos, sm) {
            // if ending with a selected orb
            if (sm.selectedOrb) {
                console.log(sm.selectedOrb);
            }
            sm.selectedOrb = null;
        }
    };
    utils.canvasPointerEvents(sm.canvasObj.canvas, sm, events);

    // main app loop
    var loop = function () {
        requestAnimationFrame(loop);
        // draw
        draw.background(sm, sm.canvasObj.ctx, sm.canvasObj.canvas);
        draw.slots(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.slots);
        sm.game.player.orbCollection.orbs.forEach(function (orb) {
            draw.orb(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, orb);
        });
        draw.orbInfo(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.orbCollection.orbs[0]);
    };
    loop();
}
    ());
