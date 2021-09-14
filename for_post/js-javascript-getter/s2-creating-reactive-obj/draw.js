var draw = function (obj, key) {
    var val = obj[key];
    console.log(key, val);
};

// a make reactive method
var makePropertyReactive = function (obj, key) {
    var val = obj[key];
    Object.defineProperty(obj, key, {
        get() {
            return val; // Simply return the cached value
        },
        set(newVal) {
            val = newVal; //
            draw(obj, key) //
        }
    });
    return obj;
};

var data = {
    count: 0
};

makePropertyReactive(data, 'count');

data.count += 1;
