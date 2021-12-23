
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    canvas.className = 'canvas-layer'
    ctx.translate(0.5, 0.5);

    // disable default action for onselectstart
    canvas.onselectstart = function () { return false; }

    // state machine object
    var sm = {
        ver: '0.16.0',
        fps: 12,
        lt: new Date(),

        // states
        states:{},            // collection of state objects
        stateObj: null,       // ref to current state object
        currentState: '',     // current state object key name (see setState call in main.js)

        data: {},
        loader: {
            json: {
                baseURL: './json',
                fileNames: [
                    'world-home',
                    'world-forest',
                    'items-home'
                ]
            }
        },
        game: {},
        canvas: canvas,
        ctx: ctx,
        input: {
            pointerDown: false,
            pos: {
                x: 0,
                y: 0
            }
        }
    };

    // set the current state
    sm.setState = function(newStateKey){
        // call any end hook for the old state of any
        var oldState = sm.states[sm.currentState];
        if(oldState){
            if(oldState.end){
                oldState.end.call(sm, sm);
            }
        }
        // update sm.currentState string and sm.stateObj and call the
        // start hook for this if any.
        sm.currentState = newStateKey;
        sm.stateObj = sm.states[sm.currentState];
        if(sm.stateObj){
            if(sm.stateObj.start){
                sm.stateObj.start.call(sm, sm);
            }
        }
    };

    // call the given eventKey in the events object of the current state object
    sm.callStateEvent = function(eventKey, e, opt){
        if(sm.stateObj){
            var events = sm.stateObj.events;
            if(events){
                if(events[eventKey]){
                    events[eventKey].call(sm, e, opt, sm)
                }
            }
        }
    };

    // pointer events
    var pointerHanders = {
        start: function (sm, e) {
            var pos = sm.input.pos = utils.getCanvasRelative(e);
            if(e.type === 'touchstart'){
                e.preventDefault();
            }
            sm.input.pointerDown = true;
            sm.callStateEvent('pointerStart', e, pos);
        },
        move: function (sm, e) {
            var pos = sm.input.pos = utils.getCanvasRelative(e);
            sm.callStateEvent('pointerMove', e, pos);
        },
        end: function (sm, e) {
            sm.input.pointerDown = false;
            sm.callStateEvent('pointerEnd', e, sm.input.pos);
        }
    };
    var createPointerHandler = function (sm, type) {
        return function (e) {
            pointerHanders[type](sm, e);
        };
    };
    canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
    canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));
    canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
    canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));


    // start loop
    sm.startLoop = function(){
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

