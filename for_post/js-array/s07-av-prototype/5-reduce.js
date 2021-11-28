let a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// reduce array of numbers into a sum
let b = a.reduce((acc, n) => {
    return acc + n;
}, 0);
console.log(b); // 45
