
var draw = function (obj) {
    console.log(obj);
};

var createReactiveProp = function (obj, key, value) {

    if (!obj['_locals']) {
        Object.defineProperty(obj, '_locals', {
            enumerable: false,
            value: {}
        });
    }

    Object.defineProperty(obj, key, {
        enumerable: false,
        set: function (value) {
            // call draw each time the value is set
            draw(this);
        },
        get: function () {}
    });
    obj.key = value;
    return obj;
};

var set = function (newValue, b) {
    //console.log(newValue, b);
    draw(this);
};

var get = function () {};

var obj = {};
createReactiveProp(obj, 'count', 0, set, get);

obj.count = 20;
obj.count = 13;
