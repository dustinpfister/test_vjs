var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// will always give the same result with the same arguments
console.log( distance(0, 0, 100, 100) ); // 141.4213562373095
console.log( distance(0, 0, 100, 100) ); // 141.4213562373095