let b = 40;

// assignment has right to left Associativity
let a = b = 5;
console.log(a); // 5
console.log(b); // 5

// just about everything else is preformed first
let c = -1;
let d = (4 + 5 * 2) / 2 - 7 || 3 + --c;
console.log(d); // 1