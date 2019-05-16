// parseInt may not always work as expected
console.log(parseInt( Math.pow(10,21) ) ); // 1

// because it converts to string first
let str = String(Math.pow(10,21));

// and it does not consider the letter e to 
// be a number
console.log(str); // 1e+21
console.log(parseInt(str)); // 1
console.log( parseInt('12e45') ); // 12