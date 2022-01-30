var smMod = (function(){

    var STATES = {

    };

    var api = {};

    api.setState = function(sm, stateKey){
        sm.currentState = stateKey;
        sm.stateObj = sm.states[sm.currentState];
    };

    api.create = function(opt){
        opt = opt || {};
        // canvas
        var canvasObj = utils.createCanvas({
            container : document.getElementById('canvas-app'),
            width: 640,
            height: 480
        });
        // state machine object
        var sm = {
            ver: opt.ver || '',
            ctx: canvasObj.ctx,
            canvas: canvasObj.canvas,
            fps: 20,
            lt: new Date(),
            game: {},
            states: STATES,
            currentState: opt.currentState || STATES[0].stateKey,
            stateObj: {}
        };
        api.setState(sm, sm.currentState);
        return sm;
    };

    api.load = function(stateObj){
        STATES[stateObj.stateKey] = stateObj;
    };

    api.startLoop = function(sm){
        // main app loop
        var loop = function(){
            var now = new Date(),
            secs = (now - sm.lt) / 1000;
            requestAnimationFrame(loop);
            if(secs > 1 / sm.fps){
                gameMod.update(sm.game, secs)
                render(sm);
                sm.lt = now;
            }
        };
        loop();
    };

}());
