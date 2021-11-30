// per range method
var rangePer = function (per, low, high) {
    per = per === undefined ? 0 : per;
    low = low === undefined ? 0 : low;
    high = high === undefined ? 1 : high;
    return low + (high - low) * per;
};
// rangeRandom method
var rangeRandom = function (low, high, filter) {
    filter = filter === undefined ? function (n) {return n;}: filter;
    return filter(rangePer(Math.random(), low, high));
};
// rangeRandom integer method
var rangeRandomInt = function (low, high) {
    return rangeRandom(low, high, function (n) {
        return Math.floor(n);
    });
};
// rangeRandom array method
var rangeRandomElement = function (array, si, ei) {
    array = array || [];
    si = si === undefined ? 0 : si;
    ei = ei === undefined ? array.length : ei;
    var index = rangeRandomInt(si, ei);
	console.log(index);
    return array[index];
};
// can get a raw random range like this
console.log(rangeRandom(1, 6));
// I can also use one of the functions that make use of a filter
console.log(rangeRandomInt(1, 6));
console.log(rangeRandomElement(['foo', 'bar', 'baz']));
// can also do things like this
var a = Array.from({
        length: 5
    }).map(function (el, i) {
        return rangePer(i / 5, 25, 50);
    });
console.log(a); // [ 25, 30, 35, 40, 45 ]
