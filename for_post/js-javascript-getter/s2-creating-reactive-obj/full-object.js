// draw
var draw_default = function (obj, key) {
    var val = obj[key];
    console.log(key, val);
};
// a make reactive property of an object
var makePropertyReactive = function (obj, key, draw) {
    draw = draw || draw_default;
    var val = obj[key];
    Object.defineProperty(obj, key, {
        get: function () {
            return val; // Simply return the cached value
        },
        set: function (newVal) {
            val = newVal;
            draw(obj, key); // call the draw method
        }
    });
    return obj;
};
// make a full object reactive
var makeObjectReative = function (obj) {
    Object.keys(obj).forEach(function (key) {
        makePropertyReactive(obj, key);
    });
    return obj;
};

var data = {
    count: 0,
    name: 'Dustin'
};
makeObjectReative(data);

data.count += 1;
data.name = 'Stin'
