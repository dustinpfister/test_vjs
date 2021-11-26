// fill module that returns a higher order function
// that will take a filler method, or a string value that is used
// to get a built in option
var fill = (function () {
    // hard coded options for filler methods
    var FILLERS = {
        // simple primitive function example
        prim: function (i, arr, prim) {
            return prim === undefined ? 0 : prim;
        },
        // range
        range: function (i, arr, nStart, delta) {
            nStart = nStart === undefined ? 0 : nStart;
            delta = delta === undefined ? 1 : delta;
            return nStart + delta * i;
        }
    };
    // return the higher order function
    return function (len, filler) {
        filler = filler === undefined ? 'prim' : filler;
        if (typeof filler === 'string') {
            filler = FILLERS[filler];
        }
        // create and return an array using the filter function
        var i = 0,
        arr = [];
        // core and additional arguments for the filler function
        coreArgu = [i, arr],
        addArgu = [].slice.call(arguments, 2, arguments.length);
        while (i < len) {
            // call filler function using apply for the current index using
            // the array for the value of this and passing an array of arguments
            // that is a concatenation of core arguments for all filler functions and
            // any additional arguments that will change depending on the filler function.
            coreArgu = [i, arr]
            arr[i] = filler.apply(arr, coreArgu.concat(addArgu));
            i += 1;
        }
        return arr;
    };
}
    ());
// DEMOS
console.log(fill(5)); // [ 0, 0, 0, 0, 0 ]
console.log(fill(5, 'prim', 1)); // [ 1, 1, 1, 1, 1 ]
console.log(fill(5, 'range')); // [ 0, 1, 2, 3, 4 ]
console.log(fill(5, 'range', 8, 2)); // [ 8, 10, 12, 14, 16 ]
// custom filler method example
var pows = function (i, arr, base, startE, deltaE, startN) {
    return startN + Math.pow(base, startE + deltaE * i);
};
console.log( fill(5, pows, 2, 2, 4, -4) ); // [ 0, 60, 1020, 16380, 262140 ]
