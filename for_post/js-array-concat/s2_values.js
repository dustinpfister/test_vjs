var a = [1, 2, 3],
b = a.concat(4, 5, '6', null, false, {}, [7, 8], [9, 10, 11], [12]);

console.log(b);
// [ 1, 2, 3, 4, 5, '6', null, false, {}, 7, 8, 9, 10, 11, 12 ]
