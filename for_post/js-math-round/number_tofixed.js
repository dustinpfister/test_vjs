
var n = 2.375158,
str = n.toFixed(n, 2);

// works as expected for this example
console.log(str); // 2.38

// but not always
console.log( (1.005).toFixed(2) ); // 1.00 (expedited 1.01)

// also returns a string
console.log(typeof str); // 'string'