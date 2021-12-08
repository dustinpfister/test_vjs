
sm.setState('title');


// loop with frame capping set by sm.fps value
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(secs >= 1 / sm.fps){
        sm.stateObj.update.call(sm, sm, secs);
        sm.stateObj.draw.call(sm, sm, {}); // empty object for 'layers' at least for now
        sm.lt = now;
    }
};
loop();


