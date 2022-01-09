var utils = {};

// create a canvas element
utils.createCanvas = function(opt){
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
    opt.canvas.onselectstart = function () { return false; }
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};

// mathematical modulo
utils.mod = function(x, m) {
    return (x % m + m) % m;
};

// wrap a number
utils.wrapNumber = function(n, min, max){
    var r = max - min;
    return (min + ((((n - min) % r) + r) % r));
};

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

// chunk and array
utils.chunk = function (arr, size) {
    var chunkedArr = [];
    arr = arr || [];
    size = size === undefined ? 1 : size;
    for (var i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
};

// PI * 2
utils.PI2 = Math.PI * 2;
 
  
// normalize an angle by half
utils.normalizeHalf = function (n, scale) {
    var c = scale || utils.PI2,
    h = c / 2;
    return utils.mod(n + h, c) - h;
};
 
// the angular distance between two angles
utils.angleDistance = function (a, b, scale) {
    var m = scale || angles.PI2,
    h = m / 2,
    diff = utils.normalizeHalf(a - b);
    if (diff > h) {
        diff = diff - m;
    }
    return utils.mod( Math.abs(diff), scale);
};
 
// get the angle from one point to another
utils.getAngleToPoint = function (pt1, pt2, scale) {
    var a = Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x);
    return utils.normalizeHalf(a, scale || utils.PI2);
};
 
// get -1, 1, or 0 depending on the the state of two angles
utils.shortestAngleDirection = function (a1, a2, scale) {
    var z = a1 - a2,
    x = utils.normalizeHalf(z, scale || utils.PI2);
    if (x < 0) {
        return -1; // Left
    }
    if (x > 0) {
        return 1; // Right
    }
    // if a1 === a2 or any other case
    return 0;
};
