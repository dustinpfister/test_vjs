var utils = {};




    /********* ********** ********** *********/
    //  BUTTON METHODS
    /********* ********** ********** *********/




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
    return {
        currentState: opt.currentState || '',
        states: {},
        events: {}
    };
};

// create the main sm object
utils.smCreateMain = function(opt){
    opt = opt || {};
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
    // value that should not be set by options
    sm.secs = 0;
    sm.stopLoop = false;
    sm.lt = new Date();

    return sm;
};

