// creating an object with two 'public' key names
let obj = {
    foo: 1,
    man: 2
};
// creating one 'private' key name by using the
// Object.defineProperty method
Object.defineProperty(obj, 'chew', {
    enumerable: false,
    value: 3
});
// sum the key names of a given object helper function
// using array reduce
let sumKeysOfObj = (obj, keyNames) => {
    return keyNames.reduce((acc, key) => {
        return acc + obj[key];
    }, 0)
};
// Object.keys will just give public key names while
// the get own property names method will give all of them
console.log( sumKeysOfObj(obj, Object.keys(obj)) ); // 3
console.log( sumKeysOfObj(obj, Object.getOwnPropertyNames(obj)) ); // 6
