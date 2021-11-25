// an 'array like' object that has
// properties key names like that of a
// javaScript Array
let obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
// The Array.from method would be another option when it comes
// to creating an array from this kind of 'array like' object
let sum = Array.from(obj).reduce((acc, el) => {
    return acc + el;
}, 0);
console.log(sum); // 6
