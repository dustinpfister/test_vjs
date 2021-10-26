var a = [];
a[9] = 42;
var c = 0;
var b = a.map(function (el) {
        c += 1;
        return el * 2;
    });

console.log(b); // [ <9 empty items>, 84 ]
console.log(c); // 1
