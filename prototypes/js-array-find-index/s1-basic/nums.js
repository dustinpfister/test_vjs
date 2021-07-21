var a = [null, 'foo', 42, 'bar', false, 11];
// find index of first number from left
var index = a.findIndex(function (el) {
        return typeof el === 'number';
    });
console.log(index); // 2
console.log(a[index]); // 42