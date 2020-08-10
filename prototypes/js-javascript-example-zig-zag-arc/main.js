
var linPerToArcPer = function (linPer) {
    return 1 - Math.abs(Math.cos(Math.PI * linPer));
};

var linPerToZigZagPer = function (linPer, waveCount) {
    waveCount = waveCount === undefined ? 1 : waveCount;
    var radian = Math.PI * waveCount * linPer
        return 1 - Math.abs(Math.cos(radian));
};

console.log(linPerToArcPer(0.5));

console.log(linPerToZigZagPer(0.125, 4));
