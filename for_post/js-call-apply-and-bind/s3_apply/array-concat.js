var arrays = [
    [4, 5, 6],
    [7, 8, 9]
];
 
// not what I want
console.log( [1,2,3].concat(arrays) );
// [ 1, 2, 3, [ 4, 5, 6 ], [ 7, 8, 9 ] ]
 
// works
console.log( [1,2,3].concat(arrays[0], arrays[1]) );
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
 
// also works using apply though
console.log( [].concat.apply([1,2,3], arrays) );
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]