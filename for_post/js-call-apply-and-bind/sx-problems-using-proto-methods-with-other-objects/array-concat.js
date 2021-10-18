// not an array
let obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};

// this will not work as expected
console.log([].concat.apply(obj, [4, 5, 6]));
// [ { '0': 1, '1': 2, '2': 3, length: 3 }, 4, 5, 6 ]

// Some times I just have to convert to an array
console.log(Array.from(obj).concat([4, 5, 6]));
// [ 1, 2, 3, 4, 5, 6 ]
