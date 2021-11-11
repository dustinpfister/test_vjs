// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: https://es5.github.io/#x15.4.4.18
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#polyfill

if (!Array.prototype['forEach']) {
    Array.prototype.forEach = function (callback, thisArg) {
        if (this == null) {
            throw new TypeError('Array.prototype.forEach called on null or undefined');
        }
        var T,
        k;
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

[1, 2, 3].forEach(function (n) {
    console.log(n);
});
