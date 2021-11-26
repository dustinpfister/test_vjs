// range method

var fill = (function () {
    // hard coded options for filler methods
    var FILLERS = {
        prim: function (i, arr, prim) {
            return prim === undefined ? 0 : prim;
        },
        range: function (i, arr, nStart, delta) {
            return nStart + delta * i;
        }
    };
    // return the higher order function
    return function (len, filler) {
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
            arr[i] = filler.apply(arr, coreArgu.concat(addArgu));
            i += 1;
        }
        return arr;
    };
}
    ());

console.log(fill(10, 'prim', 1));
