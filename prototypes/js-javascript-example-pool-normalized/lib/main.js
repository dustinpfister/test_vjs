// state object
var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });
// pool options object
var POOL_OPT = {
    count: 10,
    disableLifespan: true
};
// on spawn
POOL_OPT.spawn = function (unit, pool, sm, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = sm.canvas;
        // usere defined data for this example
        var uDat = unit.data;
        uDat.fillStyle = '#008888';
        uDat.alpha = 1;
        uDat.size = 32;
        // size and pos
        unit.w = uDat.size;
        unit.h = uDat.size;
        unit.x = canvas.width / 2;
        unit.y = canvas.height / 2;
        // heading
        unit.heading = utils.PI2 * Math.random();
        // speed
        unit.pps = utils.valueByRange(Math.random(), [32, 256]);
};
// update a unit
POOL_OPT.update = function (unit, pool, sm, secs) {
    poolMod.moveByPPS(unit, secs);
    //poolMod.wrap(unit, sm.canvas, unit.data.size)

    poolMod.clamp(unit, sm.canvas);
};

// main sm object
var sm = {
    lt: new Date(),
    fps: 30,
    pool: poolMod.create(POOL_OPT),
    ctx: canvasObj.ctx,
    canvas: canvasObj.canvas,
    background: {
       angle: 1,
       degreesPerSec: -5,
       radius: 200
    }
};

// spawn all
poolMod.spawnAll(sm.pool, sm, {})

// basic app loop
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 1 / sm.fps) {
        // update pool
        poolMod.update(sm.pool, secs, sm);
        // draw
        draw.background(sm, sm.ctx, sm.canvas);
        draw.pool(sm, sm.pool, sm.ctx);
        draw.ver(sm, sm.ctx, sm.canvas);
        // set sm.lt to now
        sm.lt = now;
    }
};
loop();
