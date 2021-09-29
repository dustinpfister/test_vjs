var array = [4, 5, 6];

var insertAt = function (array, index, what) {
    [].splice.apply(array, [index, 0].concat(what));
};
// push
var push = function (array, what) {
    insertAt(array, array.length, what);
};
// unshift
var unshift = function (array, what) {
    insertAt(array, 0, what);
};

push(array, [7, 8, 9]);
unshift(array, [1, 2, 3]);

console.log(array); // 1-2-3
