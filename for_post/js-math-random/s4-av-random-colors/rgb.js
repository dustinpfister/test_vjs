var randomRed = function (rLow, rHigh) {
    rLow = rLow === undefined ? 0: rLow;
    rHigh = rHigh === undefined ? 255: rHigh;
    var r = Math.round(rLow + Math.random() * (rHigh - rLow));
    return 'rgba(' + r + ', 0, 0, 1)';
};

console.log(randomRed()); // full red range
console.log(randomRed(200, 220)); // 200 - 220
