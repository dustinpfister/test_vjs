// state object
var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });
// main sm object
var sm = {
    ver: 'r3',
    lt: new Date(),
    fps: 30,
    game: null,
    ctx: canvasObj.ctx,
    canvas: canvasObj.canvas,
    background: {
       angle: 0,
       degreesPerSec: -5,
       radius: 400
    }
};
// set up game object
sm.game = gameMod.create({
        sm: sm
    });

var newPoints = function(size){
    size = size || 0;
    return starMod.unsteady({
        pointCount: 5 + Math.round(5 * Math.random()),
        radius : size / 2,
        radiusInner: size / 4,
        radianAjust: 0,
        nprMin: 2,
        nprMax: 6
    });
};
/*
var resizeUnsteady = function(uStar, size){
    size = size || 0;
    var opt = Object.assign({}, uStar, {
        radius: size / 2,
        radiusInner: size / 4
    });
    return starMod.unsteady(opt);
};
*/
var a = newPoints(32);

console.log( starMod.resizeUnsteady(a, 50, 2, 8) );



// basic app loop
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 1 / sm.fps) {
        gameMod.update(sm.game, secs);
        draw.background(sm, sm.ctx, sm.canvas);
        draw.pool(sm.game, sm.ctx);
        draw.info(sm, sm.ctx, sm.canvas);
        draw.ver(sm, sm.ctx, sm.canvas);
        sm.lt = now;
        // rotation of background
        //var bg = sm.background; 
        //bg.angle += Math.PI / 180 * bg.degreesPerSec * secs;
        //bg.angle = utils.mod(bg.angle, Math.PI * 2);
    }
};
loop();
