var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var b = a.filter(function (el, i) {
        return i % 2 === 0;
    });

console.log(b);
