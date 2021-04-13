
// object with named keys
var obj = {
    baz: '3',
    foo: '1',
    bar: '2'
};

// array from will result in an emty array
var arr = Array.from(obj);
console.log(arr); // []

// Object.values will return an array of values though
arr = Object.values(obj);
console.log(arr); // [3,2,1]

// the values will not be sorted though
// some something like array sort can be used
// to sort the array
arr.sort();
console.log(arr); // [1,2,3]