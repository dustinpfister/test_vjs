var utils = {};

utils.linPerToZigZagPer = function (linPer, waveCount) {
    waveCount = waveCount === undefined ? 1 : waveCount;
    var radian = Math.PI * waveCount * linPer;
        return 1 - Math.abs(Math.cos(radian));
};

utils.linPerToArcPer = function (linPer) {
    return utils.linPerToZigZagPer(linPer, 1);
};

utils.linPerToBiasPer = function (linPer) {
    return 1 - Math.abs(0.5 - linPer) / 0.5;
};
