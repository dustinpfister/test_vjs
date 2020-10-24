let a = [2, 5, 10],
b = [];
a.forEach((n, i) => {
    b.push( Math.pow(n, i) );
});
console.log(b); // [1, 5, 100]
