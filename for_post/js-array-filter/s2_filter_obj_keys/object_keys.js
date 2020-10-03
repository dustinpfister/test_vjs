var filterObjectKeys = function (obj, func, thisValue) {
    func = func || function () {
        return true;
    };
    thisValue = thisValue || obj;
    var b = {};
    Object.keys(obj).filter(function (key, i) {
        return func.call(thisValue, key, obj[key], i, obj);
    }).forEach(function (key) {
        b[key] = obj[key];
    });
    return b;
};

var obj = {
    a: 1,
    b: '1',
    c: 2,
    d: 3
};

var b = filterObjectKeys(obj, function (key, val, i, obj) {
        return typeof val === 'number';
    });

console.log(obj);
// { a: 1, b: '1', c: 2, d: 3 }
console.log(b);
//{ a: 1, c: 2, d: 3 }
