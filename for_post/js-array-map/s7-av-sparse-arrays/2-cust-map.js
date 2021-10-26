var custMap = function (arr, func) {
    var i = 0,
    newArr = [],
    len = arr.length;
    while (i < len) {
        newArr[i] = func(arr[i], i, arr);
        i += 1;
    }
    return newArr;
};
// demo
var a = [];
a[9] = 42;
var c = 0;
// using this custom map method
var b = custMap(a, function (el, i, arr) {
        c += 1;
        if (el === undefined) {
            return 0;
        }
        return el * 5;
    });
console.log(b); // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 210 ]
console.log(c); // 10
