

var linPerToZigZagPer = function (linPer, waveCount) {
    waveCount = waveCount === undefined ? 1 : waveCount;
    var radian = Math.PI * waveCount * linPer
        return 1- Math.abs(Math.cos(radian));
};

var linPerToArcPer = function (linPer) {
    return linPerToZigZagPer(linPer, 1);
};

console.log(linPerToArcPer(0));
console.log(linPerToZigZagPer(0, 4));
