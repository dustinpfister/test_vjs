// and array of numbers
var a = [1, 2, 3, 4, 0, 0, -4, -2, 0, 2, 4, 6, 8];

var result = {
    source: null,
    el: []
};
var b = a.find(function (n, i, arr) {
        result.source = arr;
        if (i >= 5) {
            result.el.push({
                index: i,
                n: n
            });
            return n > 2;
        }
        return false;
    });
console.log(result);
/*
{
    source: [1, 2, 3, 4, 0, 0, -4, -2, 0, 2, 4, 6, 8],
    el: [
        { index: 5, n: 0},
        { index: 6, n: -4},
        { index: 7, n: -2},
        { index: 8, n: 0},
        { index: 9, n: 2},
        { index: 10, n: 4}
    ]
}

*/
console.log(b); // 4
