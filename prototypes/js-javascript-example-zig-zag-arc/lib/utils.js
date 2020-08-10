var utils = {};

utils.linPerToZigZagPer = function (linPer, waveCount) {
    waveCount = waveCount === undefined ? 1 : waveCount;
    var radian = Math.PI * waveCount * linPer
        return 1- Math.abs(Math.cos(radian));
};

utils.linPerToArcPer = function (linPer) {
    return linPerToZigZagPer(linPer, 1);
};
