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

var data = {
    count: 0
};
makePropertyReactive(data, 'count');

data.count += 1;
