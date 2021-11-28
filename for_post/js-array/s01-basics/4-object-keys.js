let obj = {
    foo: 1,
    bar: 2,
    baz: 3
};
// can get an array of keys like this
let a = Object.keys(obj);
// array prototype methods can then be used with the array
// of object key names
let b = Object.keys(obj).reduce((acc, key) => {
    return acc + obj[key];
}, 0);
let c = Object.keys(obj).reduce((acc, key) => {
    return acc + key + '-';
}, '');
console.log(a);
console.log(b);
console.log(c);

