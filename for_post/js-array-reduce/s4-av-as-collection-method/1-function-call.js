// an 'array like' object that has
// properties key names like that of a
// javaScript Array
let obj = {
    0: 1,
    1: 2,
    3: 3,
    length: 3
};
// The Call Function prototype method can be used with these kinds of objects
// to get the array reduce method to work with them
let sum = Array.prototype.reduce.call(obj, function (acc, el) {
    return acc + el;
}, 0);
console.log(sum); // 3
