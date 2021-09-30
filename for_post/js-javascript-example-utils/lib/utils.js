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
        y1 + h1 < y2 ||
        y1 > y2 + h2 ||
        x1 + w1 < x2 ||
        x1 > x2 + w2);
};

// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};

// format money method
utils.formatNumber = function(number){
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
    });
    return formatter.format(number); /* $2,500.00 */
};

/********* ********** ********** *********/
//  HTTP
 /********* ********** ********** *********/

// very simple http client
utils.http = function(opt){
    var opt = opt || {};
    // default options
    opt.url = opt.url || '';
    opt.method = opt.method || 'GET';
    opt.async = opt.async === undefined ? true: opt.async;
    opt.body = opt.body === undefined ? null: opt.body;
    opt.onDone = opt.onDone || utils.noop;
    opt.onError = opt.onError || utils.noop;
    opt.responseType = opt.responseType || '';  // set to 'blob' for png
    // create and set up xhr
    var xhr = new XMLHttpRequest();
    xhr.responseType = opt.responseType;
    xhr.open(opt.method, opt.url, opt.async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if(xhr.status >= 200 && xhr.status < 400){
                opt.onDone.call(xhr, xhr.response, xhr);
            }else{
                opt.onError.call(xhr, xhr);
            }
        }
    };
    // send
    xhr.send(opt.body);
};

// load just a png file, this calls utils.http with proper settings, and the response is an Image
utils.httpPNG = function(opt){
    opt = opt || {};
    opt.onDone = opt.onDone || utils.noop;
    opt.onError = opt.onError || utils.noop;
    utils.http({
        url: opt.url,
        responseType: 'blob',
        onDone : function(res, xhr){
            var imageURL = window.URL.createObjectURL(res);
            var image = new Image();
            image.src = imageURL;
            // need to do an unload for this
            image.addEventListener('load', function(){
                opt.onDone.call(xhr, image, xhr);
            });
        },
        onError: opt.onError
    });
};

/********* ********** ********** *********/
//  LOGGING
/********* ********** ********** *********/

// basic utils.log method
utils.log = function (mess) {
    console.log(mess);
};

// log for test  ex: utils.logFor( obj.hp, obj.hp < 0 || obj.hp < obj.hpMax )
utils.logFor = function (mess, test, opt) {
    opt = opt || {};
    opt.log = opt.log || utils.log;
    if (test) {
        opt.log(mess);
    }

};

// log just once by default, but can be reset, and maxCount can be adjusted
utils.logOnce = (function () {
    var count = 0;
    return function (mess, opt) {
        opt = opt || {};
        opt.log = opt.log || utils.log;
        opt.maxCount = opt.maxCount === undefined ? 1 : opt.maxCount;
        opt.resetCount = opt.resetCount === undefined ? false : opt.resetCount;
        if (opt.resetCount) {
            count = 0;
        }
        if (count < opt.maxCount) {
            opt.log(mess);
            count += 1;
        }
    };
}
    ());

/********* ********** ********** *********/
//  OBJECTS
/********* ********** ********** *********/

// a deep clone method that should work in most situations
utils.deepClone = (function () {
    // forInstance methods supporting Date, Array, and Object
    var forInstance = {
        Date: function (val, key) {
            return new Date(val.getTime());
        },
        Array: function (val, key) {
            // deep clone the object, and return as array
            var obj = utils.deepClone(val);
            obj.length = Object.keys(obj).length;
            return Array.from(obj);
        },
        Object: function (val, key) {
            return utils.deepClone(val);
        }
    };
    // default forRecursive
    var forRecursive = function (cloneObj, sourceObj, sourceKey) {
        return cloneObj;
    };
    // default method for unsupported types
    var forUnsupported = function (cloneObj, sourceObj, sourceKey) {
        // not supported? Just ref the object,
        // and hope for the best then
        return sourceObj[sourceKey];
    };
    // return deep clone method
    return function (obj, opt) {
        var clone = {},
        conName,
        forIMethod; // clone is a new object
        opt = opt || {};
        opt.forInstance = opt.forInstance || {};
        opt.forRecursive = opt.forRecursive || forRecursive;
        opt.forUnsupported = opt.forUnsupported || forUnsupported;
        for (var i in obj) {
            // if the type is object and not null
            if (typeof(obj[i]) == "object" && obj[i] != null) {
                // recursive check
                if (obj[i] === obj) {
                    clone[i] = opt.forRecursive(clone, obj, i);
                } else {
                    // if the constructor is supported, clone it
                    conName = obj[i].constructor.name;
                    forIMethod = opt.forInstance[conName] || forInstance[conName];
                    if (forIMethod) {
                        clone[i] = forIMethod(obj[i], i);
                    } else {
                        clone[i] = opt.forUnsupported(clone, obj, i);
                    }
                }
            } else {
                // should be a primitive so just assign
                clone[i] = obj[i];
            }
        }
        return clone;
    };
}
    ());

// traverse an object
utils.traverse = function (obj, forKey, level) {
    level = level || 1;
    for (var i in obj) {
        // call forKey for every key found
        forKey.call(obj[i], obj[i], i, typeof obj[i], level, obj);
        // call utils.traverse recursively if type is object and not null
        if (typeof obj[i] === 'object' && obj[i] != null) {
            nextLevel = level + 1;
            utils.traverse(obj[i], forKey, nextLevel);
        }
    }
    return null;
};

/********* ********** ********** *********/
//  CANVAS
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
    // adjust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
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
        var l = getLevel(xp, deltaNext);
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
            return parseByXP(getXP(l, deltaNext), cap, deltaNext);
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
utils.smCreateMin = function (opt) {
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
utils.smCreateMain = function (opt) {
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
            if (handler) {
                handler.call(sm, e, pos, sm);
            }
        },
        pointerMove: function (e, pos, sm) {
            var handler = sm.states[sm.currentState].events.pointerMove;
            if (handler) {
                handler.call(sm, e, pos, sm);
            }
        },
        pointerEnd: function (e, pos, sm) {
            var handler = sm.states[sm.currentState].events.pointerEnd;
            if (handler) {
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
            if (update) {
                update.call(sm, sm, sm.secs);
            }
            // draw
            var ctx = sm.canvasObj.ctx,
            canvas = sm.canvasObj.canvas;
            var drawHook = state.draw;
            if (drawHook) {
                drawHook.call(sm, sm, ctx, canvas);
            }
            sm.lt = now;
        }
        // if sm.stopLoop === false, then keep looping
        if (!sm.stopLoop) {
            requestAnimationFrame(sm.loop);
        }
    };
    // stop loop on any page error
    window.addEventListener('error', function (e) {
        if (sm.debugMode) {
            sm.stopLoop = true;
            console.log('error: ' + e.message);
            console.log(e);
            console.log('loop stoped');
        }
    });
    return sm;
};
// push a new state object
utils.smPushState = function (sm, opt) {
    var state = {
        name: opt.name || 'state_' + Object.keys(sm.states).length
    };
    state.buttons = opt.buttons || {};
    state.start = opt.start || function () {};
    state.end = opt.end || function () {};
    state.update = opt.update || function () {};
    state.draw = opt.draw || function () {};
    state.events = opt.events || {};
    sm.states[state.name] = state;
    return state;

};
// set the current state
utils.smSetState = function (sm, newState) {
    // get a ref to the old state
    var oldState = sm.states[sm.currentState];
    // call the on end hook for the old state if it has one
    var endHook = oldState.end;
    if (endHook) {
        endHook.call(sm, sm);
    }
    // change to the new state, and call the start hook it it has one
    sm.currentState = newState;
    var newState = sm.states[sm.currentState];
    var startHook = newState.start;
    if (startHook) {
        startHook.call(sm, sm);
    }
};
