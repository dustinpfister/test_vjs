// not an array
let obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
// Can use call to use an Array method with an object
let arr = Array.prototype.map.call(obj, (n) => {
        return Math.pow(2, n);
    });
console.log(arr.constructor.name); // 'Array'
console.log(arr); // [2,4,8]
