// draw
var draw = function (obj, key, val) {
    console.log(key, val);
};
// a make reactive property of an object
var makePropertyReactive = function (obj, key, draw) {
    draw = draw || console.log;
    var val = obj[key];
    Object.defineProperty(obj, key, {
        get: function () {
            return val; // Simply return the cached value
        },
        set: function (newVal) {
            val = newVal;
            draw(obj, key, val); // log
        }
    });
    return obj;
};
// make a full object reactive
var makeObjectReative = function (obj, draw) {
    Object.keys(obj).forEach(function (key) {
        makePropertyReactive(obj, key, draw);
    });
    return obj;
};

var data = {
    count: 0,
    name: 'Dustin'
};
makeObjectReative(data, draw);

data.count += 1;
data.name = 'Stin'
