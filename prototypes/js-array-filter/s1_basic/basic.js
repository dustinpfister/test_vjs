var a = [1, 'a', 2, 'b', 3, 'c'],
b = a.filter(function (el) {
        return typeof el === 'number';
    });
console.log(a);
console.log(b);
