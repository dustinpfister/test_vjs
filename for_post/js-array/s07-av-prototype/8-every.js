let a = [1, 2, 3, 4],
b = [1, 'a', 2, 'b'];
let tester = (el) => typeof el === 'number';
console.log(a.every(tester)) // true
console.log(b.every(tester)) // false
