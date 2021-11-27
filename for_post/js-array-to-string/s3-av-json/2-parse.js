var a = [1, 2, 3, 4],
str = JSON.stringify(a);
console.log(str); // "[1,2,3,4]"

var obj = JSON.parse(str);
obj = obj.map(function (n) {
        return Math.pow(2, n);
    });
console.log(obj); // [ 2, 4, 8, 16 ]

