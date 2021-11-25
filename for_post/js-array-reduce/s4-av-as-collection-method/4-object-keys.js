// An array with info I want to reduce
// with encoded into the key names, but
// I also need to work with the values
let obj = {
    'foo_1': true,
    'bar_2': true,
    'chw_7': false,
    'baz_3': true
};
// The Object.keys method can be used to create an
// array of key names from the object. I can then use
// the array map method to create a new array based off
// of this array of key names that is composed of objects.
// each object in this array contains a key and value prop
// I can then use the reduce method off of that array to
// produce the final desired product
let sum = Object.keys(obj).map((key) => {
    return {
        key: key,
        value: obj[key]
    };
}).reduce((acc, el) => {
    if (el.value) {
        acc += parseInt(el.key.split('_')[1]);
    }
    return acc;
}, 0);
console.log(sum); // 6
