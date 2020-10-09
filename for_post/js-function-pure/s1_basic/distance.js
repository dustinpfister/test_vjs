// some globals
var x = 0,
y = 0;
// a function that makes use of the globals and some arguments
var dist = function (x2, y2) {
    return Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
};

// a function that just makes use of arguments and only arguments
// no use of globals or the this keyword
var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

console.log(dist(100, 100)); // 141.4213562373095
console.log(distance(0, 0, 100, 100)); // 141.4213562373095

x = -15;
y = -32;

// a pure function will always give the same result with the same arguments
console.log(dist(100, 100)); // 175.06855799943062
console.log(distance(0, 0, 100, 100)); // 141.4213562373095
