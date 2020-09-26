var round = function (n) {
    var int = Math.floor(n),
    diff = Math.abs(n - int);
    // special expression for diff === 0.5
    if (diff === 0.5) {
        return n >= 0 ? Math.round(n) : Math.round(n) - 1;
    }
    // addressing -0
    if (n > -0.5) {
        return 0;
    }
    // just use Math.round otherwise
    return Math.round(n);
};

console.log( Math.round(0.5) ); // 1
console.log( round(0.5) ); // 1

console.log( Math.round(-0.5) ); // -0
console.log( round(-0.5) ); // -1

console.log( Math.round(-0.25) ); // -0
console.log( round(-0.25) ); // 0