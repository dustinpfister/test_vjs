var a = [1, 2, '3', 4],
b = [1, 2, 3, 4];

var test = function (el) {
    return typeof el === 'string';
};

console.log(a.some(test)); // true
console.log(b.some(test)); // false
