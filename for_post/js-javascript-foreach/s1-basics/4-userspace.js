let forEach = function (obj, func) {
    // get an array of public keys using Object.keys
    let keys = Object.keys(obj),
    len = keys.length,
    i = 0;
    while (i < len) {
        // call func with the Function.call method to set the value
        // of this in the function to the given object. When calling pass
        // all values in a way that is like lodash forEach, and check the
        // return value, if true break;
        if (func.call(obj, obj[keys[i]], keys[i], obj)) {
            break;
        }
        i += 1;
    }
};

let a = [1, 2, 'a', 3];
forEach(a, (el, key, obj) => {
    if (typeof el === 'string') {
        return true;
    }
    console.log(key, el);
});
// 0 1
// 1 2
