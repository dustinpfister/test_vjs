var ObjectKeys = function (obj) {
    var keys = [],
    k;
    for (k in obj) {
        keys.push(k);
    }
    return keys;
};
var obj = {
    a: 1,
    b: 3
};
var keys = ObjectKeys(obj);
console.log(keys);
// [ 'a', 'b' ]
