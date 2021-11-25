// An array with just public names keys
// with no length property.
let obj = {
    'foo': 1,
    'bar': 2,
    'baz': 3
};
// the Object.values static method can be used to create an array
// of values from an object like this. Then the reduce method can be used
// off of the returned array.
let sum = Object.values(obj).reduce((acc, el) => {
    return acc + el;
}, 0);
console.log(sum); // 6
