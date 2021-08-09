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

    // EVENTS AND HELPERS

    // is the given orb, over an orb of the given collection?
    // if so return a reference to that orb from the given collection
    var isOverCollection = function (orbA, collection) {
        var i = collection.orbs.length;
        while (i--) {
            var orbB = collection.orbs[i];
            if (utils.distance(orbA.x, orbA.y, orbB.x, orbB.y) <= orbB.radius) {
                return orbB
            }
        }
        return null;
    };

    var events = {
        pointerStart: function (e, pos, sm) {
            sm.selectedOrb = OrbCollection.getOrbAtPos(sm.game.player.pouch, pos.x, pos.y);
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

                //console.log(sm.selectedOrb);
                var orbData = sm.selectedOrb.data,
                playerObj = sm.game[orbData.faction],
                collection = playerObj[orbData.key];
                // if the selected orb is from the pouch
                if (collection.key === 'pouch') {
                    console.log('from pouch');
                    //console.log(sm.selectedOrb);
                    var slot = isOverCollection(sm.selectedOrb, playerObj.slots);
                    console.log(slot);
                }
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
        sm.game.player.pouch.orbs.forEach(function (orb) {
            draw.orb(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, orb);
        });
        draw.orbInfo(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.pouch.orbs[0]);
    };
    loop();
}
    ());
