(function () {

    var orb = orbMod.createFromLevel([1, 1, 1, 1], 7);
    console.log(orb.type); // 'quad'

    // state object
    var sm = {
        game: gameMod.create(),
        canvasObj: utils.createCanvas({
            width: 640,
            height: 480,
            container: document.getElementById('canvas-app')
        })
    };

    // EVENTS AND HELPERS
    var events = {
        pointerStart: function (e, pos, sm) {
            // clicked a pouch orb
            var orb = OrbCollection.getOrbAtPos(sm.game.player.pouch, pos.x, pos.y);
            if (orb) {
                // can not select null orbs
                if (orb.type != 'null') {
                    sm.game.selectedOrb = orb;
                }
            }
            // clicked a slot orb
            var orb = OrbCollection.getOrbAtPos(sm.game.player.slots, pos.x, pos.y);
            if (orb) {
                // can not select null orbs
                if (orb.type != 'null') {
                    sm.game.selectedOrb = orb;
                }
            }
        },
        pointerMove: function (e, pos, sm) {
            if (sm.game.selectedOrb) {
                var orb = sm.game.selectedOrb;
                orb.x = pos.x;
                orb.y = pos.y;
            }
        },
        pointerEnd: function (e, pos, sm) {
            // if ending with a selected orb
            if (sm.game.selectedOrb) {
                //console.log(sm.game.selectedOrb);
                var orb = sm.game.selectedOrb,
                orbData = orb.data,
                playerObj = sm.game[orbData.faction],
                collection = playerObj[orbData.key];
                // if the selected orb is from the pouch
                if (collection.key === 'pouch') {
                    var slot = OrbCollection.isOverCollection(sm.game.selectedOrb, playerObj.slots);
                    if (slot) {
                        // set slot orb props to selected orb
                        OrbCollection.setOrbPropsToOrb(playerObj.slots, slot.data.i, orb);
                        // selected orb type set to null
                        orb.type = 'null';
                    }
                }
                // if the selected orb is from the slots
                if (collection.key === 'slots') {
                    var pouchOrb = OrbCollection.isOverCollection(sm.game.selectedOrb, playerObj.pouch);
                    console.log(pouchOrb);
                    if (pouchOrb) {
                        OrbCollection.setOrbPropsToOrb(playerObj.pouch, pouchOrb.data.i, orb);
                        orb.type = 'null';
                    }
                }
                // always send orb back to home location
                orb.x = orb.data.homeX;
                orb.y = orb.data.homeY;
                sm.game.selectedOrb = null;
            }
        }
    };
    utils.canvasPointerEvents(sm.canvasObj.canvas, sm, events);

    // main app loop
    var loop = function () {
        requestAnimationFrame(loop);
        // draw
        draw.background(sm, sm.canvasObj.ctx, sm.canvasObj.canvas);
        draw.slots(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.slots);
        draw.pouch(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.pouch)
        /*
        sm.game.player.pouch.orbs.forEach(function (orb) {
        draw.orb(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, orb);
        });
         */
        draw.orbInfo(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, sm.game.player.pouch.orbs[0]);
    };
    loop();
}
    ());
