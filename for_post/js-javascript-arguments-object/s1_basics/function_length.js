let func = function (x1, y1, x2, y2) {
    return {
        nums: Array.from(arguments),
        paramCount: func.length,
        argumentCount: arguments.length,
        per: arguments.length / func.length
    };
};
let r = func(5, 6);
console.log(r);
// { nums: [ 5, 6 ], paramCount: 4, argumentCount: 2, per: 0.5 }