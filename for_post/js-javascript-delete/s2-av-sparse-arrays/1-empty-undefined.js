// an object with three indexed keys each set to undefined
// with a private length property of 3
let obj = {
    0: 'undefined',
    1: 'undefined',
    2: 'undefined',
    length: 3
};
Object.defineProperty(obj, 'length', {
    enumerable: false,
    value: 3
});
// an empty object
// with a private length property of 3
let obj2 = {};
Object.defineProperty(obj2, 'length', {
    enumerable: false,
    value: 3
});

// so then they both have the same 'length'
console.log(obj.length); // 3
console.log(obj2.length); // 3

// but the public key count is different
console.log(Object.keys(obj).length); // 3
console.log(Object.keys(obj2).length); // 0

// delete can make obj truly empty
delete obj[0];
delete obj[1];
delete obj[2];
console.log(Object.keys(obj).length); // 0
console.log(Object.keys(obj2).length); // 0

/*
let obj = {
0: 'undefined',
1: 'undefined',
2: 'undefined'
};
Object.defineProperty(obj, 'length', {
enumerable: false,
value: Object.keys(obj.length)
});

let obj2 = {};
Object.defineProperty(obj, 'length', {
enumerable: false,
value: 3
});

console.log(obj.length);
console.log(obj2.length);
*/
