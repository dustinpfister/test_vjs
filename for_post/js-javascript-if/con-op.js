var obj = undefined;

obj = obj === undefined ? {} : obj;

console.log(typeof obj); // 'object'

// short hand for this:
if (obj === undefined) {
    obj = {};
}
