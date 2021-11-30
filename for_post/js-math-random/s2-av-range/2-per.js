// per range method
var rangePer = function (per, low, high) {
    per = per === undefined ? 0 : per;
    low = low === undefined ? 0 : low;
    high = high === undefined ? 1 : high;
    return low + (high - low) * per;
};
// so I can plug math.random in for per
console.log(rangePer(Math.random(), 5, 15) );
// put I can also pass a number literal
console.log( rangePer(0.0, 5, 15) ); // 5;
console.log( rangePer(0.5, 5, 15) ); // 10;
console.log( rangePer(1.0, 5, 15) ); // 15;

