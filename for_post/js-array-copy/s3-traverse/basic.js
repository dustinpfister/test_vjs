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

var arr = [1, 2, 3];

utils.traverse(arr, function (val, key, arr) {
    console.log(key, val);
});
