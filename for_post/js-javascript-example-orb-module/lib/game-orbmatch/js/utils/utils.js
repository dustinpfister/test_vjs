var utils = {};




    /********* ********** ********** *********/
    //  BUTTON METHODS
    /********* ********** ********** *********/




// get a button object
utils.buttonGet = function (sm, x, y) {
    var state = sm.states[sm.currentState];
    var buttons = state.buttons;
    var keys = Object.keys(buttons);
    var i = 0,
    buttonKey,
    b,
    len = keys.length;
    while (i < len) {
        buttonKey = keys[i];
        b = buttons[buttonKey];
        if (utils.boundingBox(b.x, b.y, b.w, b.h, x, y, 1, 1)) {
            return b;
        }
        i += 1;
    }
    return null;
};
// check if a button was clicked
utils.buttonCheck = function (e, pos, sm) {
    var b = utils.buttonGet(sm, pos.x, pos.y);
    if (b) {
        b.onClick.call(sm, e, pos, sm, b);
    }
};




    /********* ********** ********** *********/
    //  CANVAS METHODS
    /********* ********** ********** *********/




// create a canvas element
utils.createCanvas = function (opt) {
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () {
        return false;
    }
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
// get a canvas relative position that is adjusted for scale
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // ajust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};
// create and return a canvas pointer event handler
utils.canvasPointerEventHandler = function (state, events) {
    return function (e) {
        var pos = utils.getCanvasRelative(e),
        handler = null;
        e.preventDefault();
        if (e.type === 'mousedown' || e.type === 'touchstart') {
            handler = events['pointerStart'];
        }
        if (e.type === 'mousemove' || e.type === 'touchmove') {
            handler = events['pointerMove'];
        }
        if (e.type === 'mouseup' || e.type === 'touchend') {
            handler = events['pointerEnd'];
        }
        if (handler) {
            handler.call(e, e, pos, state);
        }
    };
};
// attach canvas pointer events
utils.canvasPointerEvents = function (canvas, state, events) {
    var handler = utils.canvasPointerEventHandler(state, events),
    options = {
        passive: false
    }
    canvas.addEventListener('mousedown', handler, options);
    canvas.addEventListener('mousemove', handler, options);
    canvas.addEventListener('mouseup', handler, options);
    canvas.addEventListener('touchstart', handler, options);
    canvas.addEventListener('touchmove', handler, options);
    canvas.addEventListener('touchend', handler, options);
};





    /********* ********** ********** *********/
    //  DISTANCE AND BOUNDING BOX
    /********* ********** ********** *********/





// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};




    /********* ********** ********** *********/
    //  State Machine Methods
    /********* ********** ********** *********/


// create a minamal sm object ( For setting up a nested sm object, and the base of a main sm object )
utils.smCreateMin = function(opt){
    opt = opt || {};
    // return a base sm object
    var sm = {
        currentState: opt.currentState || '',
        states: opt.states || {},
        events: opt.events || {}
    };
    return sm;
};
// create the main sm object
utils.smCreateMain = function(opt){
    opt = opt || {};
    // create base sm object
    var sm = utils.smCreateMin(opt);
    // values that can be set by options
    sm.ver = opt.ver || '';
    sm.game = opt.game || {};
    sm.fps = sm.fps === undefined ? 30 : opt.fps;
    sm.canvasObj = opt.canvasObj || utils.createCanvas({
        width: 640,
        height: 480,
        container: document.getElementById('canvas-app')
    });
    sm.debugMode = opt.debugMode || false;
    // value that should not be set by options
    sm.secs = 0;
    sm.stopLoop = false;
    sm.lt = new Date();
    // events
    sm.events = {
        pointerStart: function (e, pos, sm) {
            var handler = sm.states[sm.currentState].events.pointerStart;
            if(handler){
                handler.call(sm, e, pos, sm);
            }
        },
        pointerMove: function (e, pos, sm) {
            var handler = sm.states[sm.currentState].events.pointerMove;
            if(handler){
                handler.call(sm, e, pos, sm);
            }
        },
        pointerEnd: function (e, pos, sm) {
            var handler = sm.states[sm.currentState].events.pointerEnd;
            if(handler){
                handler.call(sm, e, pos, sm);
            }
        }
    };
    utils.canvasPointerEvents(sm.canvasObj.canvas, sm, sm.events);
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
            var ctx = sm.canvasObj.ctx,
            canvas = sm.canvasObj.canvas;
            var drawHook = state.draw;
            if(drawHook){
                drawHook.call(sm, sm, ctx, canvas);
            }
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
utils.smPushState = function(sm, opt){
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
utils.smSetState = function(sm, newState){
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

