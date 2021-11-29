// Polly fill found here
// https://www.npmjs.com/package/array-flat-polyfill
if (!Array.prototype.flat) {
    Object.defineProperty(Array.prototype, 'flat', {
        configurable: true,
        value: function flat() {
            var depth = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
            return depth ? Array.prototype.reduce.call(this, function (acc, cur) {
                if (Array.isArray(cur)) {
                    acc.push.apply(acc, flat.call(cur, depth - 1));
                } else {
                    acc.push(cur);
                }
                return acc;
            }, []) : Array.prototype.slice.call(this);
        },
        writable: true
    });
}
// demo
let a = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
let b = a.flat();
console.log(b); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
