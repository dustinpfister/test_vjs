var dimReturn = function (n) {
    return 1 - 1 / (n + 1);
};

console.log(dimReturn(0));   // 0
console.log(dimReturn(0.5)); // 0.33333333333333337
console.log(dimReturn(5));   // 0.8333333333333334
console.log(dimReturn(50));  // 0.9803921568627451
console.log(dimReturn(500)); // 0.998003992015968
