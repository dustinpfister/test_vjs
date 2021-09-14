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
            draw(key, val); // log
        }
    });
    return obj;
};

var data = {
    count: 0
};
makePropertyReactive(data, 'count');

data.count += 1;
