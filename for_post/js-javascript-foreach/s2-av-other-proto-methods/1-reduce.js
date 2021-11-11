let a = [1, 2, 3].reduce((acc, n) => {
    console.log(acc, n);
    return acc + n;
});
console.log(a);
// 1 2
// 3 3
// 6
let b = [1, 2, 3].reduce((acc, n) => {
    console.log(acc, n);
    return acc + n;
}, 0);
console.log(b);
// 0 1
// 1 2
// 3 3
// 6
