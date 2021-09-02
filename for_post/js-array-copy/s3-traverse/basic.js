utils = {};

utils.traverse = function (obj, forKey, level) {
    level = level || 1;
    for (var i in obj) {
        // call forKey for every key found
        forKey.call(obj[i], obj[i], i, typeof obj[i], level, obj);
        // call utils.traverse recursively if type is object and not null
        if (typeof obj[i] === 'object' && obj[i] != null) {
            nextLevel = level + 1;
            utils.traverse(obj[i], forKey, nextLevel);
        }
    }
    return null;
};

// basic example
var arr = [1, 2, 3];
utils.traverse(arr, function (val, key, type, level, arr) {
    console.log(level, key, val, type);
});
/*
0 1
1 2,
2 3
 */

console.log('');

// nested loop example
var arr = [{
        x: 1,
        y: 2
    }, 3, 4];
utils.traverse(arr, function (val, key, type, level, arr) {
    console.log(level, key, val, type);
});
/*
1 '0' {x: 1,y: 2} 'object' 
2 'x' 1 'number' 
2 'y' 2 'number' 
1 '1' 3 'number' 
1 '2' 4 'number'
*/