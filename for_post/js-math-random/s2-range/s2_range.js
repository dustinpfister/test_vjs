
var randomRange = function (low, high) {
    low = low === undefined ? 0 : low;
    high = high === undefined ? 1 : high;
    var range = high - low;
    return low + range * Math.random();
};

var n = randomRange(-5, 5);
console.log(n);
