(function () {

    console.log(sm.stateObj);
    sm.setState('game');
    console.log(sm.stateObj);


    // loop with frame capping set by sm.fps value
    var loop = function () {
        var now = new Date(),
        secs = (now - sm.lt) / 1000;
        requestAnimationFrame(loop);
        if(secs >= 1 / sm.fps){
            //gameMod.update(sm.game);
            //draw.back(sm);
            //draw.map(sm);
            //draw.info(sm);

            var state = sm.states[sm.currentState];
            state.update.call(sm, sm, secs);
            state.draw.call(sm, sm, {}); // empty object for 'layers' at least for now

            sm.lt = now;
        }
    };

    loop();

}
    ());
