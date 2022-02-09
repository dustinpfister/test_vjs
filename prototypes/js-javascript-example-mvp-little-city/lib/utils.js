// UTILS
var utils = {};

//
// MISC
//

// get a value by way of a per value (0-1), and a min and max value
utils.valueByRange = function(per, a, b){
    per = per === undefined ? 0 : per;
    per = per < 0 ? 0 : per;
    per = per > 1 ? 1 : per;
    var nMin, nMax;
    if(typeof a === 'object'){
        nMin = a[0];
        nMax = a[1];
    }else{
        nMin = a === undefined ? 0 : a;
        nMax = b === undefined ? 1 : b;
    }
    var result = nMin + Math.round(per * (nMax - nMin));
    return result;
};

// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1 < y2 ||
        y1 > y2 + h2) ||
        x1 + w1 < x2 ||
        x1 > x2 + w2);
};
utils.boundingBox2 = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1 <= y2 ||
        y1 >= y2 + h2) ||
        x1 + w1 <= x2 ||
        x1 >= x2 + w2);
};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

//
// OBJECT
//

// deep clone using JSON
utils.deepCloneJSON = function (obj) {
    try{
       return JSON.parse(JSON.stringify(obj));
    }catch(e){
        return {};
    }
};


//
// DOM
//

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
// get a point relative to a canvas element rather than window
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: Math.floor((e.touches ? e.touches[0].clientX : e.clientX) - bx.left),
        y: Math.floor((e.touches ? e.touches[0].clientY : e.clientY) - bx.top),
        bx: bx
    };
    // adjust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    return pos;
};

//
//  STORAGE
//


utils.ws = (function () {
    var ws = {};
    // private test function
    var test = function () {
        if (!localStorage) {
            return false;
        }
        // save a test object for key ws-test
        localStorage.setItem('ws-test', JSON.stringify({
                value: 'foo'
            }));
        // try to now get what we just saved
        var string = localStorage.getItem('ws-test');
        if (string) {
            // so we have a string parse to an object
            try {
                var result = JSON.parse(string);
            } catch (e) {
                return false;
            }
            // so we have an object, is are test value there?
            var pass = result.value === 'foo';
            // in any case remove the item
            localStorage.removeItem('ws-test');
            // return result of pass boolean if all is well it should be true
            return pass;
        }
        return false;
    }
    // public test function
    ws.test = function (opt) {
        opt = opt || {};
        opt.onDisabled = opt.onDisabled || function () {};
        // feature test for local storage
        if (test()) {
            return true;
        }
        opt.onDisabled.call(opt, opt, 'ws-test');
        return false;

    };
    // get an item with local storage
    ws.get = function (key, opt) {
        opt = opt || {};
        opt.onDisabled = opt.onDisabled || function () {};
        // feature test for local storage
        if (test()) {
            var mess = localStorage.getItem(key);
            if (mess) {
                return mess;
            }
        } else {
            opt.onDisabled.call(opt, opt, key);
        }
        return '';
    };
    // set an item with local storage
    ws.set = function (key, value, opt) {
        opt = opt || {};
        opt.onDisabled = opt.onDisabled || function () {};
        if (test()) {
            localStorage.setItem(key, value);
        } else {
            opt.onDisabled.call(opt, opt, key);
        }
    };
    // return ws
    return ws;
}
    ());
