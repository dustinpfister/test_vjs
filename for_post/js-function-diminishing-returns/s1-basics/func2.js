var dimReturn2 = function (n, a) {
    return 1 - 1 / (n / a + 1);
};

console.log(dimReturn2(0, 500));     // 0
console.log(dimReturn2(0.5, 500));   // 0.0009990009990008542
console.log(dimReturn2(5, 500));     // 0.00990099009900991
console.log(dimReturn2(50, 500));    // 0.09090909090909094
console.log(dimReturn2(500, 500));   // 0.5

console.log(dimReturn2(10000, 500)); // 0.9523809523809523