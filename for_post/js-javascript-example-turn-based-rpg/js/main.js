
// set the current state
sm.setState('game');

// start loop helper
var startLoop = function(){
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
};

// load world map
utils.http({
    url: './json/world-home.json',
    onDone: function(res, xhr){
        // parse world map
        try{
            var map = JSON.parse(res);
        }catch(e){
            var map = {};
        }
        // Crude yet effective way of loading json world map
        sm.game = gameMod.create({
            marginX : 14,
            marginY : 7,
            w: 9,
            h: 7,
            mapStrings : map.mapStrings
        });
        // now start the loop
        startLoop();
    },
    onError: function(){
        console.log('error loading home world map!');
        console.log('are you using this by way of the file protocol?');
        // now start the loop
        startLoop();

    }
});




