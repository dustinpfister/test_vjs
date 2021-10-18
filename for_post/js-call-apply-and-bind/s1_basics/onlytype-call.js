var onlyType = function (typeStr) {
    typeStr = typeStr || 'number';
    var arr = this; // using 'this' keyword to refer to what should be an array
    return arr.filter(function (el) {
        return typeof el === typeStr;
    });
};
// demo
var a = [1, 'two', 3, 'four', 5];
var b = onlyType.call(a, 'number');
console.log(b);
// [1, 3, 5]
