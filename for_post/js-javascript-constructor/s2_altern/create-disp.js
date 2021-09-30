
var utils = {};

// create just a point object
utils.createPoint = function (x, y) {
    return {
        x: x === undefined ? 0 : x,
        y: y === undefined ? 0 : y
    };
};

// create a display object based off of a point object
utils.createDisp = function (opt) {
    opt = opt || {};
    var disp = utils.createPoint(opt.x, opt.y);
    disp.w = opt.w === undefined ? 32 : opt.w;
    disp.h = opt.h === undefined ? 32 : opt.h;
    return disp;
};

// distance will still work with points and now display objects
utils.distance = function (obj, a, b) {
    var x2 = 0,
    y2 = 0,
    x1 = obj.x,
    y1 = obj.y;
    // if disp object adjust to cx cy
    if (obj.w != undefined && obj.h != undefined) {
        x1 += obj.w / 2;
        y1 += obj.h / 2;
    }
    if (typeof a === 'number') {
        x2 = a;
        y2 = b === undefined ? 0 : b;
    }
    if (typeof a === 'object') {
        x2 = a.x;
        y2 = a.y;
        // if disp object adjust to cx cy
        if (a.w != undefined && a.h != undefined) {
            x2 += a.w / 2;
            y2 += a.h / 2;
        }
    }
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// points still work fine
var pt1 = utils.createPoint(10, 15);
console.log(utils.distance(pt1, utils.createPoint(10, 5))); // 10
// works with disp objects
var disp = utils.createDisp({
        x: 10 - 16 + 10,
        y: 15 - 16,
        w: 32,
        h: 32
    });
console.log(utils.distance(pt1, disp)); // 10
