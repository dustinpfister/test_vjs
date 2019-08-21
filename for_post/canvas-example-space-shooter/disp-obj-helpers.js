
var disp = disp || {};

// apply canvas bounds to given display object with the given canvas
disp.applyBounds = function (obj, canvas) {
    var w = obj.w || 16,
    h = obj.h || 16;
    if (obj.x < -w) {
        obj.x = canvas.width + w - Math.abs(obj.x) % (canvas.width + w);
    }
    if (obj.x > canvas.width + w) {
        obj.x = obj.x % (canvas.width + w);
    }
    if (obj.y < -h) {
        obj.y = canvas.height + h - Math.abs(obj.y) % (canvas.height + h);
    }
    if (obj.y > canvas.height + h) {
        obj.y = obj.y % (canvas.height + h);
    }
};

// move a display Obj with the current heading and pps relative to the
// given amount of time in ms
disp.moveObj = function (obj, t) {
    var s = t / 1000;
    var delta = obj.pps * s;
    obj.x += Math.cos(obj.heading) * delta;
    obj.y += Math.sin(obj.heading) * delta;
};

// distance
disp.distance = function (obj1, obj2) {
    return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2));
};
