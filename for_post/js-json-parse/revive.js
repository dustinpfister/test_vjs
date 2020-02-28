var str = '[1,2,3,4,\"a\"]',
obj;
var revive = function (key, val) {
    if (typeof val === 'number') {
        return Math.pow(2, val);
    }
    return val;
};
try {
    obj = JSON.parse(str, revive);
} catch (e) {
    obj = [];
}

console.log(obj);
// [ 2, 4, 8, 16, 'a' ]
