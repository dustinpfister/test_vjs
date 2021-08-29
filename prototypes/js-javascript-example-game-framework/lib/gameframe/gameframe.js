
(function (api) {

/********* ********** ********** *********/
//  State Machine Methods
 /********* ********** ********** *********/

    // create a minamal sm object ( For setting up a nested sm object, and the base of a main sm object )
    api.smCreateMin = function(opt){
        opt = opt || {};
        // return a base sm object
        var sm = {
            currentState: opt.currentState || '',
            states: opt.states || {},
            events: opt.events || {}
        };
        return sm;
    };

    // helpers for main create method
    var callStateObjectPointerEvent = function(){
        var handler = sm.states[sm.currentState].events.pointerStart;
            if(handler){
            handler.call(sm, e, pos, sm);
        }
    };

    // create the main sm object
    api.smCreateMain = function(opt){
        opt = opt || {};
        // create base sm object
        var sm = api.smCreateMin(opt);
        // values that can be set by options
        sm.ver = opt.ver || '';
        sm.game = opt.game || {};
        sm.fps = sm.fps === undefined ? 30 : opt.fps;


        // events
        sm.events = {
            pointerStart: function (e, pos, sm) {
                console.log('yes');
            },
            pointerMove: function (e, pos, sm) {

            },
            pointerEnd: function (e, pos, sm) {
 
            }
        };


// set up stack of canvas layers using the canvas module
sm.layers = canvasMod.createLayerStack({
    length: opt.canvasLayers === undefined ? 3 : opt.canvasLayers,
    container: opt.canvasContainer || document.getElementById('canvas-app') || document.body,
    events: sm.events,
    state: sm
});

/*
    sm.canvasObj = opt.canvasObj || api.createCanvas({
        width: 640,
        height: 480,
        container: document.getElementById('canvas-app')
    });
*/

        sm.debugMode = opt.debugMode || false;
        // value that should not be set by options
        sm.secs = 0;
        sm.stopLoop = false;
        sm.lt = new Date();

        //api.canvasPointerEvents(sm.canvasObj.canvas, sm, sm.events);


        // main loop
        sm.loop = function () {
            var now = new Date();
            sm.secs = (now - sm.lt) / 1000,
            state = sm.states[sm.currentState];
            if (sm.secs >= 1 / sm.fps) {
                // update
                var update = state.update;
                if(update){
                    update.call(sm, sm, sm.secs);
                }
                // draw
/*
                var ctx = sm.canvasObj.ctx,
                canvas = sm.canvasObj.canvas;
                var drawHook = state.draw;
                if(drawHook){
                    drawHook.call(sm, sm, ctx, canvas);
                }
*/
                sm.lt = now;
            }
            // if sm.stopLoop === false, then keep looping
            if(!sm.stopLoop){
                requestAnimationFrame(sm.loop);
            }
        };
        // stop loop on any page error
        window.addEventListener('error', function(e) {
            if(sm.debugMode){
                sm.stopLoop = true;
                console.log('error: ' + e.message);
                console.log(e);
                console.log('loop stoped');
            }
        });
        return sm;
    };
    // push a new state object
    api.smPushState = function(sm, opt){
        var state = {
            name: opt.name || 'state_' + Object.keys(sm.states).length
        };
        state.buttons = opt.buttons || {};
        state.start = opt.start || function(){};
        state.end = opt.end || function(){};
        state.update = opt.update || function(){};
        state.draw = opt.draw || function(){};
        state.events = opt.events || {};
        sm.states[state.name] = state;
        return state;
    };
    // set the current state
    api.smSetState = function(sm, newState){
        // get a ref to the old state
        var oldState = sm.states[sm.currentState];
        // call the on end hook for the old state if it has one
        var endHook = oldState.end;
        if(endHook){
            endHook.call(sm, sm);
        }
        // change to the new state, and call the start hook it it has one
        sm.currentState = newState;
        var newState = sm.states[sm.currentState];
        var startHook = newState.start;
        if(startHook){
            startHook.call(sm, sm);
        }
    };  
}
    (this['gameFrame'] = {}));
