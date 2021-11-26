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
        while (i < len) {
            arr[i] = filler.apply(arr, [i, arr]);
            i += 1;
        }
        return arr;
    };
}
    ());


console.log( fill(10, 'prim', 1) );

