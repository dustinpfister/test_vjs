utils = {};

utils.traverse = function (obj, forKey) {
    for (var i in obj) {
        // call forKey for every key found
        forKey.call(obj[i], obj[i], i, obj);
        // call utils.traverse recursively if type is object and not null
        if (typeof obj[i] === 'object' && obj[i] != null) {
            var foundLabel = utils.traverse(obj[i], forKey);
        }
    }
    return null;
};

// basic example
var arr = [1, 2, 3];
utils.traverse(arr, function (val, key, arr) {
    console.log(key, val);
});
/*
0 1
1 2,
2 3
*/

console.log('');

// nested loop example
var arr = [ {x: 1, y: 2}, 3, 4],
var copy = [];
utils.traverse(arr, function (val, key, arr) {
    console.log(key, val);
});