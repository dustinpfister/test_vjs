var obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};

var a = Array.prototype.concat.call(obj, 4, 5, [6, 7]),
b = Array.from(obj).concat(4, 5, [6, 7]);

console.log(a);
// [ { '0': 1, '1': 2, '2': 3, length: 3 }, 4, 5, 6, 7 ]
console.log(b);
// [ 1, 2, 3, 4, 5, 6, 7 ]
