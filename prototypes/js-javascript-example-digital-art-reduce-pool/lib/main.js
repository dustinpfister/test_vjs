var LIFESPAN = 7;

// state object
var canvasObj = utils.createCanvas();

var sm = {
    lt : new Date(),
    fps: 30
};

// basic app loop
var loop = function(){
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(secs >= 1 / sm.fps){
        
    }
    sm.lt = now;
};
loop();
