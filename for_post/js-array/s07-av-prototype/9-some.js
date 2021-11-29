let a = [1, 2, 3, 4],
b = [1, 'a', 2, 'b'],
c = ['a', 'b', 'c', 'd'];
let tester = (el) => typeof el === 'number';
console.log(a.some(tester)) // true
console.log(b.some(tester)) // true
console.log(c.some(tester)) // false
