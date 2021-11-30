// per range method
var rangePer = function (per, low, high) {
    per = per === undefined ? 0 : per;
    low = low === undefined ? 0 : low;
    high = high === undefined ? 1 : high;
    return low + (high - low) * per;
};
// rangeRandom method
var rangeRandom = function (low, high, filter) {
    filter = filter === undefined ? function (n) { return n; } : filter;
    return filter( rangePer(Math.random(), low, high) );
};
// can get a random range like this
console.log( rangeRandom(1, 6) );
// can also do things like this
var a = Array.from({length: 5}).map(function(el, i){
    return rangePer( i / 5, 25, 50);
});
console.log(a); // [ 25, 30, 35, 40, 45 ]
