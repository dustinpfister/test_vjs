var onlyType = function (arr, typeStr) {
    typeStr = typeStr || 'number';
    return arr.filter(function (el) {
        return typeof el === typeStr;
    });
};
// demo
var a = [1, 'two', 3, 'four', 5];
var b = onlyType.call(a, 'number');
console.log(b)
