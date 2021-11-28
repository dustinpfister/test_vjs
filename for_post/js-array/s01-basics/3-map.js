let a = [1, 2, 3, 4].map((el) => {
    return Math.pow(2, el);
});
console.log(a.join('-')); // '2-4-8-16'
