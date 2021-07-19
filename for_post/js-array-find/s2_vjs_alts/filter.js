// and array of numbers
var a = [1, 2, 3, 4, 5, 6, 7];

var cb = function (n) {
    return n > 2 && n < 6;
};
// find will just give the first result moving from left to right
var b = a.find(cb);
console.log(b); // 3

// so filter can be used also
var c = a.filter(cb);
// the first index will hen be the same result
console.log(c[0]); // 3
// however I can also get the full collection of elements that meet
// the conditions of the expresion used in the callback
console.log(c); // [3, 4, 5]
