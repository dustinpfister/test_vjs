var utils = {};


/********* ********** ********** *********/
//  MISCELLANEOUS METHODS
 /********* ********** ********** *********/

// no operation ref
utils.noop = function () {};

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

// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};


/********* ********** ********** *********/
//  BASIC EXP SYSTEM
 /********* ********** ********** *********/

// Basic experience point system methods
utils.XP = (function () {
    // default values
    var default_deltaNext = 50,
    defualt_cap = 100;
    // get level with given xp
    var getLevel = function (xp, deltaNext) {
        deltaNext = deltaNext === undefined ? default_deltaNext : deltaNext;
        return (1 + Math.sqrt(1 + 8 * xp / deltaNext)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var getXP = function (level, deltaNext) {
        deltaNext = deltaNext === undefined ? default_deltaNext : deltaNext;
        return ((Math.pow(level, 2) - level) * deltaNext) / 2;
    };
    // parse a levelObj by XP
    var parseByXP = function (xp, cap, deltaNext) {
        //cap = cap === undefined ? default_cap : cap;
        var l = getLevel(xp);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = getXP(level + 1);
        return {
            level: level,
            levelFrac: l,
            per: l % 1,
            xp: xp,
            forNext: l === cap ? Infinity : forNext,
            toNext: l === cap ? Infinity : forNext - xp
        };
    };
    return {
        // use getXP method and then pass that to parseXP for utils.XP.parseByLevel
        parseByLevel: function (l, cap, deltaNext) {
            return parseByXP(getXP(l, deltaNext), cap);
        },
        // can just directly use parseByXP for utils.XP.parseByXP
        parseByXP: parseByXP
    };
}
    ());


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
