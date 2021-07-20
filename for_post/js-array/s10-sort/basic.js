// basic example that will mutate in place
let arr = [7, 4, 2, 5, 8, 6, 3, 1];
arr.sort();
console.log(arr);
// [ 1, 2, 3, 4, 5, 6, 7, 8 ]

// to not mutate in place a copy of the source array
// must be made first, it will then be the copy that 
// is mutated by array sort
arr = [4, 0, 1, 1, 5, 8, 3, 4, 6];
let b = arr.map((n)=>{ return n}).sort();
console.log(arr); // [ 4, 0, 1, 1, 5, 8, 3, 4, 6 ]
console.log(b) // [ 0, 1, 1, 3, 4, 4, 5, 6, 8 ]

// the array reverse method is one way to reverse the order
arr = [4, 9, 8, 2, 3, 6, 5];
arr.sort().reverse();
console.log(arr); //[ 9, 8, 6, 5, 4, 3, 2 ]
