

var onlyType = function (typeStr) {
    typeStr = typeStr || 'number';
    var arr = this;
    return arr.filter(function (el) {
        return typeof el === typeStr;
    });
};

var a = [1, 'two', 3, 'four', 5];

var b = onlyType.call(a, 'number');

console.log(b)
