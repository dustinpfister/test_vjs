var obj = {
    a: 1,
    b: '1',
    c: 2,
    d: 3
},
b = {};

Object.keys(obj).filter(function (key) {
    var el = obj[key];
    return typeof el === 'number';
}).forEach(function (key) {
    b[key] = obj[key];
});

console.log(obj);
console.log(b);
