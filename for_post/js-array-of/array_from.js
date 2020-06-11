let obj = {
    0: 10,
    length: 1
};

// just a plain old object
console.log(obj.constructor.name); // 'Object'
console.log(obj.map); // undefined

// Array.from can be used to turn it into an array
let arr = Array.from(obj);
console.log(obj.constructor.name); // 'Array'
console.log(arr.map); // [Function: map]
console.log(arr.length); // 1
console.log(arr[0]); // 10