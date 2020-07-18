var filterNotNumber = function (arr) {
    return arr.filter((el) => {
        return typeof el === 'number';
    });
};

var arr = [null, 1, 2, 'foo', 3, {}, [], 4, 5];

var pows = filterNotNumber(arr).map((n) => {
        return Math.pow(2, n);
    }).reverse().join('-')

console.log(pows);
// 32-16-8-4-2
