let forEach = function (obj, func) {
    let keys = Object.keys(obj), len = keys.length, i = 0;
    while (i < len) {
        if (func.call(obj, obj[keys[i]], keys[i], obj)) {
            break;
        }
        i += 1;
    }
};
 
// works with solid arrays
let a = [1,2,3,4];
forEach(a, (n) => {
    console.log(n);
});
// 1 2 3 4
 
// works just like array for each when it comes to sparse arrays
let obj = {0: 1, 2: 2, 5: 3, 15: 4};
Object.defineProperty(obj, 'length', {value: 16});
let b = Array.prototype.map.call(obj, function(n){ return n; });
forEach(b, (n) => {
    console.log(n);
});
// 1 2 3 4
 
// I can also directly pass an array like object
forEach(obj, (n) => {
    console.log(n);
});
// 1 2 3 4
 
// Works with named collections also
let obj2 = {foo: 1, bar: 2, baz: 3, taz: 4};
forEach(obj2, (n) => {
    console.log(n);
});
// 1 2 3 4
